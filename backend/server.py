# encoding: utf-8

import cherrypy
from cherrypy.lib import static
import mimetypes
import sys
import os
from datetime import datetime

if len(sys.argv) < 2:
	raise ValueError('No port specified!')

cache = os.getcwd() + "/cache"

accessed = {}

cherrypy.config.update({'server.socket_port': int(sys.argv[1])})

os.popen("rm -r " + cache)
os.popen("mkdir -p " + cache)

class Root(object):
    @cherrypy.expose
    def index(self, praca, strana):

        praca = praca.replace(" ", "+")

        if os.path.isfile(cache + praca + "page-" + strana +".jpg"):
            return static.serve_file(cache + praca + "page-" + strana +".jpg", content_type="image/jpeg", disposition=None, name=None)

        if len(accessed) > 100:
            oldest = None
            for k in accessed.keys():
                if oldest is None or accessed[k] < accessed[oldest]:
                    oldest = k

            os.popen("rm -r " + cache + oldest)
            accessed.pop(oldest)
            
        os.popen("mkdir -p " + cache + praca)
        
        for i in os.popen("ls /zkp" + praca).read().split("\n"):
            if "priloha" not in i:
                os.popen("/usr/sfw/bin/gs -dNOPAUSE -sDEVICE=jpeg -o " + cache + praca + "page-%03d.jpg -r144 /zkp" + praca + i)
                break
        accessed[praca] = datetime.now(tz=None)
        return static.serve_file(cache + praca + "page-" + strana +".jpg", content_type="image/jpeg", disposition=None, name=None)

    @cherrypy.expose
    def metadata(self, praca):

        praca = praca.replace(" ", "+")

        for i in os.popen("ls /zkp" + praca).read().split("\n"):
            if "priloha" not in i:
                return os.popen("/opt/csw/bin/pdfinfo /zkp"+ praca.replace(" ", "+", 1) + i).read()

        return 404
        
    @cherrypy.expose
    def view(self, id):
        return static.serve_file(os.getcwd() + "/frontend/build/index.html")
        
cherrypy.server.socket_host='0.0.0.0'

cherrypy.quickstart(Root(), '/', config={
        '/frontend/build/static': {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': os.getcwd() + "/frontend/build/static"
            }
    })
