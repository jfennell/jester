"""
Script to scrape image urls off of Masked Manor.
"""
from __future__ import with_statement

import re
import simplejson
import time
import urllib
from BeautifulSoup import BeautifulSoup
from contextlib import closing
from pprint import pprint


START_URL = 'http://www.maskedmanor.com/2010/02/01/a-lot-at-stake-part-i/'

def img_tag_getter(soup):
	result = soup.find(id='comic')
	result = result.find('img')
	result = dict(result.attrs)
	return result

prev_class_re = re.compile('navi-prev')
def prev_url_getter(soup):
	"""Get the 'prev' link url.  May not exist."""
	result = soup.find(**{'class': prev_class_re})
	result = result.attrMap.get('href', '')
	return result

next_class_re = re.compile('navi-next')
def next_url_getter(soup):
	result = soup.find(**{'class': next_class_re})
	result = result.attrMap.get('href', '')
	return result

def extract_page_info(page_soup):
	page_info = {}

	img_tag = img_tag_getter(page_soup)
	page_info['title'] = img_tag['title']
	page_info['img'] = img_tag['src']
	page_info['prev'] = prev_url_getter(page_soup)
	page_info['next'] = next_url_getter(page_soup)

	return page_info

def get_soup(url):
	with closing(urllib.urlopen(url)) as url: 
		soup = BeautifulSoup(url.read())
	return soup

if __name__ == '__main__':
	url = START_URL
	img_urls = []
	while url:
		print url

		soup = get_soup(url)
		page_info = extract_page_info(soup)
		url = page_info['next']
		img_urls.append(page_info['img'])

		pprint(page_info)
		print

		time.sleep(1)

	with open('masked_manor_url_list.json', 'w') as f:
		simplejson.dump(img_urls, f, indent=4)
