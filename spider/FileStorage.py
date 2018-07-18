from qiniu import Auth, put_file

import requests
import tempfile
import uuid

def saveToServer(url):
    key = str(uuid.uuid1())
    # token = token
    localfile = downloadFile(url)
    ret, resp = put_file(token, key, localfile)
    key = ret["key"]
    return 'http://assetdef.moboo.ly/%s'%key

def saveHtmlToServer(html):
    with tempfile.NamedTemporaryFile('w+', delete=False) as f:
        f.write(html)
        
    key = str(uuid.uuid1())
    # token = generateToken()
    localfile = f.name
    ret, resp = put_file(token, key, localfile)
    key = ret["key"]
    return 'http://assetdef.moboo.ly/%s'%key


def downloadFile(url):
    r = requests.get(url, stream=True, timeout=500)
    if r.status_code != 200:
            raise Exception("Cannot connect with oss server or file is not existed")
    with tempfile.NamedTemporaryFile('w+b', delete=False) as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:
                f.write(chunk)
        return f.name

# access_key = 'Jo_0IP_pYJeXhotGAWJGb7p2aDk-6WUyPAkCn9SQ'
# secret_key = '7lVPM5049AC45CsbOU9_RCpoazf_mV_xdpmy3c5n'
access_key = '-m1LzxFKMhXaApWxDgK8TyI99gTy-RJYIEg0c9Ig'
secret_key = 'IStf6MkdpmzFu7Q2rou0mCU8feL0_4uz0JAjEjJ0'

q = Auth(access_key, secret_key)
bucket_name = 'store-live-default'
policy = {
    'persistentOps':'imageView2/2/w/1200',
    'detectMime': 1,
    "returnBody":  '{\
        "name": $(fname), \
        "size": $(fsize),\
        "type": $(mimeType),\
        "hash": $(etag),\
        "key": $(key),\
        "w": $(imageInfo.width),\
        "h": $(imageInfo.height),\
        "color": $(imageAve),\
        "orientation": $(exif.Orientation.val),\
        "video": $(avinfo.video)\
    }'
}

token = q.upload_token(bucket_name, None, 3600 * 24, policy)
# def generateToken():
    # return q.upload_token(bucket_name, None, 3600 * 24, policy)

# https://developer.qiniu.com/kodo/manual/1206/put-policy
