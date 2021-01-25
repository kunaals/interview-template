import sys
from os import path
sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))

from flask import Flask, render_template

from flask_graphql import GraphQLView
from backend.lib.graphql.schema import schema

app = Flask(__name__)
app.debug = True

@app.route('/')
def index():
  return render_template(
    'index.html',
    js_url='//localhost:8080/main.bundle.js'
  )

@app.route('/manage/')
def manage():
  return render_template(
    'manage_vendors.html',
    js_url='//localhost:8080/manage_vendors.bundle.js'
  )

app.add_url_rule('/graphql', view_func=GraphQLView.as_view(
  'graphql',
  schema=schema,
  graphiql=True,
))

if __name__ == '__main__':
  app.run()
