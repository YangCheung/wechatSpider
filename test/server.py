from http.server import HTTPServer, CGIHTTPRequestHandler

PORT = 8000
httpd = HTTPServer(('0.0.0.0', PORT), CGIHTTPRequestHandler)
print("Starting simple_httpd on port: " + str(httpd.server_port))
httpd.serve_forever()