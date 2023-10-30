from App import create_app

app = create_app()

if __name__ == '__main__':
    # Start server
    app.run(debug=True, port=5100, host='0.0.0.0')
