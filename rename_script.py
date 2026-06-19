import os
import re
import glob
import unicodedata

def clean_name(old_name, chatgpt_counter):
    if old_name == "Athanasya presentazione + spoiler canzone-Copertina.jpg" or old_name == "athanasya-presentazione-spoiler-canzone-copertina.jpg":
        return "athanasya-presentazione-spoiler-canzone-copertina.jpg", chatgpt_counter
    if old_name == "athy-cantante-virtuale copia.jpg":
        return "athy-cantante-virtuale-02.jpg", chatgpt_counter
    if old_name == "@athy-reference-frontale.png":
        return "athy-reference-frontale.png", chatgpt_counter
    if old_name == "@athy-reference-intera.png":
        return "athy-reference-intera.png", chatgpt_counter
    if old_name.startswith("ChatGPT Image"):
        new_name = f"athy-generated-{chatgpt_counter:02d}.png"
        return new_name, chatgpt_counter + 1
    
    if old_name == "I lose your name_I find my truth.png":
        return "i-lose-your-name-i-find-my-truth.png", chatgpt_counter
    if old_name == "MASTER-REFERENCE.png":
        return "master-reference.png", chatgpt_counter
    if old_name == "Nella ferita nasce più luce_If I break-I break in bloom.png":
        return "nella-ferita-nasce-piu-luce-if-i-break-i-break-in-bloom.png", chatgpt_counter
    if old_name == "These chains of love can’t hold me now.png" or old_name == "These chains of love can't hold me now.png":
        return "these-chains-of-love-cant-hold-me-now.png", chatgpt_counter

    # General rules
    name, ext = os.path.splitext(old_name)
    
    # remove accents
    name = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode('utf-8')
    
    # lowercase
    name = name.lower()
    
    # replace dots with hyphens if they are after digits, e.g., "1.scena" -> "1-scena"
    name = name.replace(".", "-")
    
    # replace spaces and underscores with hyphens
    name = name.replace(" ", "-").replace("_", "-")
    
    # remove symbols @, +, ,, (, ), ', ’
    name = re.sub(r"[@\+,\(\)'’]", "", name)
    
    # remove multiple hyphens
    name = re.sub(r"-+", "-", name)
    
    # prefix single digits at the start with 0
    name = re.sub(r'^(\d)-', lambda m: f"{int(m.group(1)):02d}-", name)

    return name + ext, chatgpt_counter

def main():
    assets_dir = "/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB/assets"
    base_dir = "/Users/macbookretina/Downloads/SOCIALIN_SITO_WEB"
    
    # Read files
    files = sorted(os.listdir(assets_dir))
    
    rename_map = {}
    chatgpt_counter = 1
    
    for f in files:
        if f == ".DS_Store": continue
        new_name, chatgpt_counter = clean_name(f, chatgpt_counter)
        if f != new_name:
            rename_map[f] = new_name
            
    print("Files to rename:")
    for old, new in rename_map.items():
        print(f"  {old} -> {new}")
        
    # Gather all HTML, CSS, JS files
    target_exts = {".html", ".css", ".js"}
    files_to_check = []
    for root, dirs, fnames in os.walk(base_dir):
        for fname in fnames:
            if os.path.splitext(fname)[1] in target_exts:
                files_to_check.append(os.path.join(root, fname))
                
    # Replace in files
    modified_files = set()
    found_assets = set()
    for file_path in files_to_check:
        with open(file_path, "r", encoding="utf-8") as file:
            try:
                content = file.read()
            except UnicodeDecodeError:
                continue
                
        new_content = content
        for old, new in rename_map.items():
            # simple string replacement because the names are quite unique
            # and might be URL encoded (e.g., spaces to %20)
            
            # replace exact old name
            if old in new_content:
                new_content = new_content.replace(old, new)
                found_assets.add(old)
                
            # replace URL encoded old name
            import urllib.parse
            old_encoded = urllib.parse.quote(old)
            if old != old_encoded and old_encoded in new_content:
                new_content = new_content.replace(old_encoded, new)
                found_assets.add(old)
                
        if content != new_content:
            with open(file_path, "w", encoding="utf-8") as file:
                file.write(new_content)
            modified_files.add(file_path)

    # Rename files
    for old, new in rename_map.items():
        old_path = os.path.join(assets_dir, old)
        new_path = os.path.join(assets_dir, new)
        # Avoid collisions or overwriting if new_path already exists and it's not the same file with different case
        if os.path.exists(new_path) and old.lower() != new.lower():
            print(f"WARNING: {new_path} already exists. Skipping rename for {old}.")
        else:
            os.rename(old_path, new_path)
            
    print("\nModified files:")
    for m in modified_files:
        print(f"  {m}")
        
    print("\nAssets found in code:")
    for a in found_assets:
        print(f"  {a}")

if __name__ == "__main__":
    main()
