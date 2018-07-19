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

def saveArticleToServer(article):
    ArticleInfo = leancloud.Object.extend('Article')
    query1 = ArticleInfo.query.equal_to("fileid", article["fileid"])
    query2 = ArticleInfo.query.equal_to("wechat_id", article["wechat_id"])
    result = leancloud.Query.and_(query1,query2)
    try:
        result.first()
    except leancloud.errors.LeanCloudError as e:
        articleModel = ArticleInfo()
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