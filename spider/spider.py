from wechatsogou.api import WechatSogouAPI
from pymongo import MongoClient
import json


api = WechatSogouAPI()
db = MongoClient('t.yangio.com', 7077)

gzhList = ["周末酒店"]

def getGzhHistory(name):
    info = api.get_gzh_article_by_history(name)
    return info

def getGzhArticles():
    info = getGzhHistory(gzhList[0])
    articles = info.get("article")
    for article in articles:
        print(article["content_url"])



# getGzhArticles()