import os

def read_database():
    user_info = []
    script_path = os.path.abspath(__file__) # i.e. /path/to/dir/foobar.py
    script_dir = os.path.split(script_path)[0] #i.e. /path/to/dir/
    with open(os.path.join(script_dir, 'database_user_info.txt'), 'r', encoding='utf-8') as f:
        for token in f.readlines():
            token = token.strip("\n")
            user_info.append(token)
    return user_info