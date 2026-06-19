#!/usr/bin/perl
use strict;
use warnings;
use File::Basename;
use File::Find;
use File::Copy;
use URI::Escape;
use POSIX qw(ceil);

my $assets_dir = "/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/assets";
my $base_dir = "/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB";

opendir(my $dh, $assets_dir) || die "Can't opendir $assets_dir: $!";
my @files = grep { !/^\./ && -f "$assets_dir/$_" } readdir($dh);
closedir $dh;

@files = sort @files;

my %rename_map = ();
my @renamed_info = ();
my @errors = ();

sub get_orientation {
    my ($file) = @_;
    my $ext = lc((fileparse($file, qr/\.[^.]*/))[2]);
    if ($ext !~ /^\.(jpg|jpeg|png|webp|gif)$/) {
        return "";
    }
    
    my $cmd = "sips -g pixelWidth -g pixelHeight \"$assets_dir/$file\" 2>/dev/null";
    my $output = `$cmd`;
    
    my ($width) = $output =~ /pixelWidth:\s*(\d+)/;
    my ($height) = $output =~ /pixelHeight:\s*(\d+)/;
    
    if (defined $width && defined $height && $width > 0 && $height > 0) {
        my $diff = abs($width - $height);
        my $max = $width > $height ? $width : $height;
        
        # Consider square if difference is <= 5% of max dimension
        if ($diff / $max <= 0.05) {
            return "quadrata";
        } elsif ($height > $width) {
            return "verticale";
        } else {
            return "orizzontale";
        }
    }
    return "";
}

sub clean_name {
    my ($old_name, $orientation) = @_;
    
    my ($name, $dirs, $ext) = fileparse($old_name, qr/\.[^.]*/);
    
    # remove accents
    $name =~ s/à/a/g;
    $name =~ s/è/e/g;
    $name =~ s/é/e/g;
    $name =~ s/ì/i/g;
    $name =~ s/ò/o/g;
    $name =~ s/ù/u/g;
    
    $name = lc($name);
    
    # replace dots with hyphens
    $name =~ s/\./-/g;
    
    # replace spaces and underscores with hyphens
    $name =~ s/ /-/g;
    $name =~ s/_/-/g;
    
    # remove symbols
    $name =~ s/(\@|\+|,|\(|\)|'|’)//g;
    
    # ensure single digits at start are padded (optional, keeping from previous logic)
    if ($name =~ /^(\d)-/) {
        $name =~ s/^(\d)-/sprintf("%02d-", $1)/e;
    }
    
    # Remove existing orientation suffixes to prevent duplication or conflicting
    $name =~ s/-(verticale|orizzontale|quadrata)+$//g;
    $name =~ s/-(verticale|orizzontale|quadrata)-/-/g;
    
    # remove multiple hyphens
    $name =~ s/-+/-/g;
    $name =~ s/-$//;
    
    # append orientation
    if ($orientation ne "") {
        # Check if name already has the orientation word somewhere inside it
        if ($name !~ /-$orientation$/) {
            $name .= "-$orientation";
        }
    }
    
    # clean multiple hyphens again just in case
    $name =~ s/-+/-/g;
    
    return $name . lc($ext);
}

for my $f (@files) {
    # Skip non-images and some specific files if needed
    my $ext = lc((fileparse($f, qr/\.[^.]*/))[2]);
    if ($ext !~ /^\.(jpg|jpeg|png|webp|gif)$/) {
        next;
    }
    
    my $orientation = get_orientation($f);
    my $new_name = clean_name($f, $orientation);
    
    if ($f ne $new_name) {
        $rename_map{$f} = $new_name;
        push @renamed_info, "$f|$new_name|$orientation";
    }
}

my @files_to_check;
find(sub {
    my $f = $_;
    if (-f $f && ($f =~ /\.html$/ || $f =~ /\.css$/ || $f =~ /\.js$/)) {
        push @files_to_check, $File::Find::name;
    }
}, $base_dir);

my %modified_files;
my %found_assets;

for my $file_path (@files_to_check) {
    open my $fh, '<:encoding(UTF-8)', $file_path or next;
    my $content = do { local $/; <$fh> };
    close $fh;
    
    next unless defined $content;
    
    my $new_content = $content;
    for my $old (keys %rename_map) {
        my $new = $rename_map{$old};
        
        my $changed = 0;
        if ($new_content =~ s/\Q$old\E/$new/g) {
            $changed = 1;
        }
        
        my $old_uri = $old;
        $old_uri =~ s/ /%20/g;
        $old_uri =~ s/\+/%2B/g;
        $old_uri =~ s/\,/%2C/g;
        $old_uri =~ s/\(/%28/g;
        $old_uri =~ s/\)/%29/g;
        $old_uri =~ s/'/%27/g;
        
        if ($old ne $old_uri && $new_content =~ s/\Q$old_uri\E/$new/g) {
            $changed = 1;
        }
        
        if ($changed) {
            $found_assets{$old} = 1;
        }
    }
    
    if ($content ne $new_content) {
        open my $fh_out, '>:encoding(UTF-8)', $file_path or next;
        print $fh_out $new_content;
        close $fh_out;
        $modified_files{$file_path} = 1;
    }
}

for my $old (keys %rename_map) {
    my $new = $rename_map{$old};
    my $old_path = "$assets_dir/$old";
    my $new_path = "$assets_dir/$new";
    
    if (-e $new_path && lc($old) ne lc($new)) {
        push @errors, "WARNING: $new_path already exists. Skipping rename for $old.";
    } else {
        rename($old_path, $new_path) or push @errors, "Failed to rename $old to $new: $!";
    }
}

print "--- SUMMARY START ---\n";
for my $info (@renamed_info) {
    print "RENAME|$info\n";
}
for my $m (keys %modified_files) {
    print "MODIFIED|$m\n";
}
for my $a (keys %found_assets) {
    print "FOUND|$a\n";
}
for my $e (@errors) {
    print "ERROR|$e\n";
}
print "--- SUMMARY END ---\n";
