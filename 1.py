import urllib.request
import os
import shutil

my_lessons = [
   #  http://vid.com/vod/mp4:vod/PRV/Yg0WGN_6.mp4/media_b180000_454.ts
    "https://bcbolt446c5271-a.akamaihd.net/media/v1/hls/v4/clear/1107601866001/c07a77a9-124b-453e-9a8f-7d96a4bf17c1/54e8c63f-3631-4bf2-93cc-de56bf50504a/5x/segment21.ts?akamai_token=exp=1649706894~acl=/media/v1/hls/v4/clear/1107601866001/c07a77a9-124b-453e-9a8f-7d96a4bf17c1/54e8c63f-3631-4bf2-93cc-de56bf50504a/*~hmac=401d8ba6e7160b066636247158c070137a917cf829cb95a12d04b94fe392e45a" # replace this with your url 


]

lesson_dir = "my_vids"
try:
    shutil.rmtree(lesson_dir)
except:
    print "ok"

os.makedirs(lesson_dir)
os.chdir(lesson_dir)

for lesson, dwn_link in enumerate(my_lessons):
    print ("downloading lesson  %d.. " % (lesson), dwn_link)
    file_name = '%04d.mp4' % lesson
    f = open(file_name, 'ab')
    for x in range(0, 1200):
        try:
            rsp = urllib.request.urlopen(dwn_link + "_%04d.ts" % (x) )
        except:
            break
        file_name = '%d.mp4' % lesson
        print "downloading  %d.ts" % (x)
        f.write(rsp.read())
    f.close()



print "done good luck!! ==================  "