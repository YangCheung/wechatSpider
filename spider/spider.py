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
        print("开始更新 %s"%gzh["wechat_name"])
        articles = info.get("article")
        count = 0
        for article in articles:
            article["wechat_id"] = gzh["wechat_id"]
            articleContent = api.get_article_content_head(article.get("content_url"))
            count += saveArticles(article, articleContent)
        print("=============")
        print("-- %s -- 新增 %s 文章 "%(gzhname,count))
        print("=============")

def saveArticles(article, html):
    # url = saveHtmlToServer(html)
    article["html"] = html
    return saveArticleToServer(article, htmlSaver = saveHtmlToServer)

def hostingImage(url):
    return saveToServer(url)    

def saveGzhInfo(info):
    saveGzhInfoToServer(info)


getGzhArticles()
