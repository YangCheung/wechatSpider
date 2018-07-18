import leancloud

leancloud.init("g37Y6E59SabFzqpvGDb7XP8k-gzGzoHsz", "9TCdpv5Ri70jE3HGmkgL8b5k")

def saveGzhInfo(info):
    GzhInfo = leancloud.Object.extend('GzhInfo')
    query = GzhInfo.query.equal_to("wechat_name", info["wechat_name"])
    # try:
    #     query.first()
    # except leancloud.errors.LeanCloudError as e:
    gzh = GzhInfo()
    gzh.set("wechat_name", info.get("wechat_name"))
    gzh.set("wechat_id", info.get("wechat_id"))
    gzh.set("introduction", info.get("introduction"))
    gzh.set("authentication", info.get("authentication"))
    gzh.set("headimage", info.get("headimage"))
    gzh.save()

def saveArticle(article):
    ArticleInfo = leancloud.Object.extend('Article')
    # query = ArticleInfo.query.equal_to("title", article["title"])
    # try:
    #     query.first()
    # except leancloud.errors.LeanCloudError as e:
    articleModel = ArticleInfo()
    articleModel.set("datetime", article.get("datetime"))
    articleModel.set("main", article.get("main"))
    articleModel.set("title", article.get("title"))
    articleModel.set("abstract", article.get("abstract"))
    articleModel.set("source_url", article.get("source_url"))
    articleModel.set("cover", article.get("cover"))
    articleModel.set("content_url", article.get("content_url"))
    articleModel.save()