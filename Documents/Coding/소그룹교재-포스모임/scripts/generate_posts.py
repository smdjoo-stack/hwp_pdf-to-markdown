import os
import json
import re
from datetime import datetime
import glob
import urllib.parse
import unicodedata

def strip_html_tags(text):
    return re.sub(r'<[^>]+>', '', text)

def get_title_from_html(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
            if match:
                return match.group(1).strip()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
    return None

def extract_info(filepath):
    filename = os.path.basename(filepath)
    # Expected format: YYYYMMDD_Title.html
    match = re.match(r'^(\d{8})_(.+?)\.html$', filename)
    
    date_str = ""
    title_from_file = ""
    
    if match:
        date_raw = match.group(1)
        # Format date as YYYY-MM-DD
        date_str = f"{date_raw[:4]}-{date_raw[4:6]}-{date_raw[6:]}"
        title_from_file = match.group(2).strip()
    else:
        # Fallback to file creation/modification time if format doesn't match
        mtime = os.path.getmtime(filepath)
        date_str = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
        title_from_file = filename.replace('.html', '').strip()
    
    # Try to get better title from inside the HTML
    html_title = get_title_from_html(filepath)
    
    # Normalize Mac's NFD Korean characters to NFC standard before encoding
    nfc_filename = unicodedata.normalize('NFC', filename)
    
    # Safely encode the filename for web URL usage (fixes Github Pages 404)
    encoded_filename = urllib.parse.quote(nfc_filename)
    
    return {
        "title": html_title if html_title else title_from_file,
        "description": title_from_file, # Use filename part as a subtitle/description
        "path": f"교재/{encoded_filename}",
        "date": date_str
    }

def main():
    target_dir = "교재"
    output_file = "data/posts.js"
    
    if not os.path.exists(target_dir):
        print(f"Directory '{target_dir}' not found.")
        return

    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    posts = []
    for filepath in glob.glob(os.path.join(target_dir, "*.html")):
        info = extract_info(filepath)
        posts.append(info)
        
    # Sort posts by date descending
    posts.sort(key=lambda x: x['date'], reverse=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("const postsData = ")
        json.dump(posts, f, ensure_ascii=False, indent=2)
        f.write(";\n")
        
    print(f"Generated {output_file} successfully with {len(posts)} entries.")

if __name__ == "__main__":
    main()
