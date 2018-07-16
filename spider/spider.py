from wechatsogou.api import WechatSogouAPI
import json

api = WechatSogouAPI()

gzhList = ["周末酒店"]

def getGzhHistory(name):
    info = api.get_gzh_article_by_history(name)
    return info

def getGzhArticles():
    info = getGzhHistory(gzhList[0])
    articles = info.get("article")
    for article in articles:
        print(article["content_url"])



getGzhArticles()