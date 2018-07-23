import leancloud

leancloud.init("g37Y6E59SabFzqpvGDb7XP8k-gzGzoHsz", "9TCdpv5Ri70jE3HGmkgL8b5k")

def saveGzhInfoToServer(info):
    GzhInfo = leancloud.Object.extend('GzhInfo')
    query = GzhInfo.query.equal_to("wechat_id", info["wechat_id"])
    try:
        query.first()
    except leancloud.errors.LeanCloudError as e:
        gzh = GzhInfo()
        gzh.set("wechat_name", info.get("wechat_name"))
        gzh.set("wechat_id", info.get("wechat_id"))
        gzh.set("introduction", info.get("introduction"))
        gzh.set("authentication", info.get("authentication"))
        gzh.set("headimage", info.get("headimage"))
        gzh.save()

def saveArticleToServer(article, htmlSaver = None):
    ArticleInfo = leancloud.Object.extend('Article')
    query1 = ArticleInfo.query.equal_to("fileid", article["fileid"])
    query2 = ArticleInfo.query.equal_to("wechat_id", article["wechat_id"])
    result = leancloud.Query.and_(query1,query2)
    count = 0
    try:
        result.first()
        # print("ignore %s %s"%article["wechat_id"],article["title"])
    except leancloud.errors.LeanCloudError as e:
        articleModel = ArticleInfo()
        if htmlSaver and article["html"]:
            url = htmlSaver(article["html"])
            articleModel.set("content_url", url)
        articleModel.set("fileid", article.get("fileid"))
        articleModel.set("wechat_id", article.get("wechat_id"))
        articleModel.set("datetime", article.get("datetime"))
        articleModel.set("main", article.get("main"))
        articleModel.set("title", article.get("title"))
        articleModel.set("abstract", article.get("abstract"))
        articleModel.set("source_url", article.get("source_url"))
        articleModel.set("cover", article.get("cover"))
        articleModel.set("content_url", article.get("content_url"))
        articleModel.save()
        count = 1
        print("saved %s %s"%(article["wechat_id"],article["title"]))
    return count