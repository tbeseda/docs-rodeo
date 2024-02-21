@app
docs-rodeo

@static
fingerprint true
prune true

@http
get /
get /:locale/docs/*

@aws
region us-east-1
architecture arm64
runtime nodejs20.x
