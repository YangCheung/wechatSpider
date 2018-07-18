from wechatsogou.api import WechatSogouAPI
import FileStorage
import storage
import FileStorage
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
            articleContent = api.get_article_content(article.get("content_url"), hosting_callback = hostingImage)
            saveArticles(article, articleContent["content_html"])

def saveArticles(article, html):
    print(html)
    url = FileStorage.saveHtmlToServer(html)

    article["content_url"] = url
    storage.saveArticle(article)

def hostingImage(url):
    return FileStorage.saveToServer(url)    

def saveGzhInfo(info):
    storage.saveGzhInfo(info)


getGzhArticles()
