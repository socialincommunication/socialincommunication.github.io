#!/usr/bin/perl
use strict;
use warnings;
use File::Basename;
use File::Find;
use File::Copy;
use URI::Escape;

my $assets_dir = "/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/assets";
my $base_dir = "/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB";

opendir(my $dh, $assets_dir) || die "Can't opendir $assets_dir: $!";
my @files = grep { !/^\./ && -f "$assets_dir/$_" } readdir($dh);
closedir $dh;

@files = sort @files;

my %rename_map = ();
my $chatgpt_counter = 1;

sub clean_name {
    my ($old_name) = @_;
    
    if ($old_name eq "Athanasya presentazione + spoiler canzone-Copertina.jpg" || $old_name eq "athanasya-presentazione-spoiler-canzone-copertina.jpg") {
        return "athanasya-presentazione-spoiler-canzone-copertina.jpg";
    }
    if ($old_name eq "athy-cantante-virtuale copia.jpg") {
        return "athy-cantante-virtuale-02.jpg";
    }
    if ($old_name eq "\@athy-reference-frontale.png") {
        return "athy-reference-frontale.png";
    }
    if ($old_name eq "\@athy-reference-intera.png") {
        return "athy-reference-intera.png";
    }
    if ($old_name =~ /^ChatGPT Image/) {
        my $new_name = sprintf("athy-generated-%02d.png", $chatgpt_counter);
        $chatgpt_counter++;
        return $new_name;
    }
    if ($old_name eq "I lose your name_I find my truth.png") {
        return "i-lose-your-name-i-find-my-truth.png";
    }
    if ($old_name eq "MASTER-REFERENCE.png") {
        return "master-reference.png";
    }
    if ($old_name eq "Nella ferita nasce più luce_If I break-I break in bloom.png") {
        return "nella-ferita-nasce-piu-luce-if-i-break-i-break-in-bloom.png";
    }
    if ($old_name eq "These chains of love can’t hold me now.png" || $old_name eq "These chains of love can't hold me now.png") {
        return "these-chains-of-love-cant-hold-me-now.png";
    }

    my ($name, $dirs, $ext) = fileparse($old_name, qr/\.[^.]*/);
    
    # remove accents manually for common italian ones since we don't have unicode normalization library guaranteed
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
    
    # remove symbols @, +, ,, (, ), ', ’
    $name =~ s/(\@|\+|,|\(|\)|'|’)//g;
    
    # remove multiple hyphens
    $name =~ s/-+/-/g;
    
    # prefix single digits at the start with 0
    if ($name =~ /^(\d)-/) {
        $name =~ s/^(\d)-/sprintf("%02d-", $1)/e;
    }

    return $name . $ext;
}

for my $f (@files) {
    my $new_name = clean_name($f);
    if ($f ne $new_name) {
        $rename_map{$f} = $new_name;
    }
}

print "Files to rename:\n";
for my $old (keys %rename_map) {
    print "  $old -> $rename_map{$old}\n";
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
        
        # also try URI encoded old name
        my $old_encoded = uri_escape_utf8($old);
        # uri_escape_utf8 encodes some chars like @ or +, let's do a basic encode instead just for spaces and parentheses
        $old_encoded =~ s/%20/ /g; # wait, uri_escape_utf8 escapes everything.
        # Let's use a simpler replace for common URI chars
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
        print "WARNING: $new_path already exists. Skipping rename for $old.\n";
    } else {
        rename($old_path, $new_path) or print "Failed to rename $old to $new: $!\n";
    }
}

print "\nModified files:\n";
for my $m (keys %modified_files) {
    print "  $m\n";
}

print "\nAssets found in code:\n";
for my $a (keys %found_assets) {
    print "  $a\n";
}
