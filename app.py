from flask import Flask, request, render_template, jsonify, url_for, redirect
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- MySQL DB Configuration ---
def get_db_connection():
    return mysql.connector.connect(
        host='127.0.0.1',          # Use 127.0.0.1 instead of localhost
        port=3307,                 # Default port
        database='shreemex_db',
        user='root',
        password='12345'
    )

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

# Redirect /about.html to /about
@app.route('/about.html')
def about_html_redirect():
    return redirect('/about')

@app.route('/products')
def products():
    return render_template('products.html')

# Redirect /products.html to /products
@app.route('/products.html')
def products_html_redirect():
    return redirect('/products')

@app.route('/services')
def services():
    return render_template('services.html')

# Redirect /services.html to /services
@app.route('/services.html')
def services_html_redirect():
    return redirect('/services')

@app.route('/team')
def team():
    return render_template('team.html')

# Redirect /team.html to /team
@app.route('/team.html')
def team_html_redirect():
    return redirect('/team')

@app.route('/contact') 
def contact():
    return render_template('contact.html')

# Redirect /contact.html to /contact
@app.route('/contact.html')
def contact_html_redirect():
    return redirect('/contact')

@app.route('/submit_contact', methods=['POST'])
def handle_contact():
    data = request.get_json()
    name = data.get('fullName')
    email = data.get('email')
    message = data.get('message')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        sql = "INSERT INTO contact_form (full_name, email, message) VALUES (%s, %s, %s)"
        cursor.execute(sql, (name, email, message))
        conn.commit()
        return jsonify({'status': 'success'}), 200
    except Error as e:
        print("❌ Database Error:", e)
        return jsonify({'status': 'error', 'message': str(e)}), 500
    finally:
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

# Catch-all route for any HTML file that doesn't have a specific route
@app.route('/<path:page>.html')
def handle_html_extension(page):
    # Check if there's a route for this page without the .html extension
    try:
        return redirect('/' + page)
    except:
        return "Page not found", 404

# Run the app
if __name__ == '__main__':
    app.run(debug=True)