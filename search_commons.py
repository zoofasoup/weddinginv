import requests
import json
import urllib.parse

def search_commons(query):
    headers = {'User-Agent': 'WeddingInvBot/1.0 (https://github.com/zoofasoup/weddinginv)'}
    url = f"https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch={urllib.parse.quote(query)}&utf8=&format=json&srlimit=15"
    response = requests.get(url, headers=headers)
    data = response.json()
    
    for item in data['query']['search']:
        title = item['title']
        print(f"Found: {title}")
        
        # Get image URL
        image_url_req = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&format=json"
        img_res = requests.get(image_url_req, headers=headers).json()
        pages = img_res['query']['pages']
        for page_id in pages:
            if 'imageinfo' in pages[page_id]:
                print(f"URL: {pages[page_id]['imageinfo'][0]['url']}")

search_commons('filetype:png "pink" "flower" "watercolor"')
