from wechatsogou.api import WechatSogouAPI
from spider.storage import *
from spider.FileStorage import *
import json
import time

api = WechatSogouAPI()
# db = MongoClient('t.yangio.com', 7077)

gzhList = ["周末酒店", "ibuy亲子"]

def getGzhHistory(name):
    info = api.get_gzh_article_by_history(name)
    return info

def getGzhArticles():
    for gzhname in gzhList:
        info = getGzhHistory(gzhname)
        gzh = info.get("gzh")
        headImageInfo = hostingImage(gzh.get("headimage"))
        gzh["headimage"] = headImageInfo
        saveGzhInfo(gzh)

        articles = info.get("article")
        for article in articles:
            article["wechat_id"] = gzh["wechat_id"]
            articleContent = api.get_article_content_head(article.get("content_url"))
            saveArticles(article, articleContent)

def saveArticles(article, html):
    print(html)
    url = saveHtmlToServer(html)

    article["content_url"] = url
    saveArticleToServer(article)

def hostingImage(url):
    return saveToServer(url)    

def saveGzhInfo(info):
    saveGzhInfoToServer(info)


getGzhArticles()
