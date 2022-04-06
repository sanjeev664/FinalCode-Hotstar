from flask import Blueprint, jsonify, request
import mysql.connector
import requests

views = Blueprint('views', __name__)


@views.route("/homepage_categories", methods=['GET'])
def homepage_categories():
    try:
        conn = mysql.connector.connect(
            host="178.237.56.73", user="admin_buddy9_qa", password="buddy@9", database="admin_buddy9_qa")
        my_cursor = conn.cursor(buffered=True)
        
        my_cursor.execute("SELECT id,name FROM genres")
        all_genres = my_cursor.fetchall()
        all_details_api=[]
        for id,name in all_genres:
            details = {}
            details["genres"]=id
            details["id"]=name
            my_cursor.execute(f"SELECT * FROM genres_movie INNER JOIN movie ON \
                movie.id=genres_movie.movie_id AND movie.status=1 AND genres_movie.status = 1 INNER JOIN files ON files.movie_id=movie.id \
                    where genres_id = {id}  AND files.status=1 LIMIT 26;")
            all_movies = my_cursor.fetchall()
            data = []
            for movies in all_movies:
                data.append(
                    {
                    "id":movies[7],
                    "cat_id":movies[8],
                    "title":movies[9],
                    "cover":movies[10],
                    "landscape":movies[11],
                    "trailer":movies[12],
                    "tags":movies[13],
                    "released":movies[14],
                    "quality":movies[15],
                    "imbd":movies[16],
                    "description":movies[17],
                    "position":movies[18],
                    "trending_value":movies[19],
                    "server":movies[20],
                    "mdb_posted":movies[21],
                    "status":movies[22],
                    "created_at":movies[23],
                    "updated_at":movies[24],
                    "movie_cover_image": "https://" + movies[20] + "/uploads/movie/" + movies[10],
                    "files":[
                    {
                        "id":movies[25],
                        "movie_id":movies[26],
                        "src":movies[27],
                        "format":movies[28],
                        "file_name":movies[29],
                        "artist":movies[30],
                        "sub_title":movies[31],
                        "position":movies[32],
                        "premium":movies[33],
                        "server":movies[34],
                        "status":movies[35],
                        "created_at":movies[36],
                        "updated_at":movies[37]
                    }
                    ]}
                )
            details["data"]=data
            all_details_api.append(details)

        return jsonify(all_details_api)
    
    except Exception as e:
        return jsonify({'status':404, "message":e})



@views.route("/search_word/<SearchWord>", methods=['GET'])
def search_word(SearchWord):
    all_search_data = []
    conn = mysql.connector.connect(
        host="178.237.56.73", user="admin_buddy9_qa", password="buddy@9", database="admin_buddy9_qa")
    my_cursor = conn.cursor(buffered=True)
    my_cursor.execute("SELECT * FROM movie WHERE status = 1 AND title LIKE '"+SearchWord+"%'")
    try:
        movie_details = my_cursor.fetchone()
        m_details = movie_details[0]
        sql_select_query = """select * from files where movie_id = %s"""
        my_cursor.execute(sql_select_query, (m_details,))
        movie_src_details = my_cursor.fetchone()
        data_in_dict = {
            'movie_id': movie_details[0],
            'movie_title': movie_details[2],
            'movie_description': movie_details[10],
            'movie_released': movie_details[7],
            'movie_tags': movie_details[6],
            'movie_trailer': movie_details[5],
            'movie_src': "https://" + movie_src_details[9] + "/" + movie_src_details[2] + "/master.m3u8",
            'movie_cover_image': "https://" + movie_details[13] + "/uploads/movie/" + movie_details[3]
        }
    except:
        data_in_dict = {"data":"No data found"}
    all_search_data.append(data_in_dict)
    conn.close()
    return jsonify(all_search_data)
    

@views.route("/single_videos/<movie_id>", methods=['GET'])
def single_videos(movie_id):
    all_data = []
    conn = mysql.connector.connect(
        host="178.237.56.73", user="admin_buddy9_qa", password="buddy@9", database="admin_buddy9_qa")
    my_cursor = conn.cursor()
    my_cursor.execute(
        "SELECT * FROM files Where status = 1 AND movie_id = " + movie_id)
    movie_src_details = my_cursor.fetchone()
    my_cursor.execute(
        "SELECT * FROM movie Where status = 1 AND id = " + movie_id)
    movie_details = my_cursor.fetchone()
    data_in_dict = {
        'movie_id': movie_id,
        'movie_title': movie_details[2],
        'movie_description': movie_details[10][:300],
        'movie_released': movie_details[7],
        'movie_tags': movie_details[6],
        'movie_trailer': movie_details[5],
        'movie_src': "https://" + movie_src_details[9] + "/" + movie_src_details[2] + "/master.m3u8",
        'movie_cover_image': "https://" + movie_details[13] + "/uploads/movie/" + movie_details[3]
    }
    all_data.append(data_in_dict)
    conn.close()
    return jsonify(all_data)


@views.route("/movie_category_videos/<movie_category_name>/limit=<limit>", methods=['GET'])
def movie_category_videos(movie_category_name, limit):
    all_data = []
    conn = mysql.connector.connect(
        host="178.237.56.73", user="admin_buddy9_qa", password="buddy@9", database="admin_buddy9_qa")
    my_cursor = conn.cursor()
    movie_category_name = movie_category_name
    sql_select_query = "Select * from movie where cat_id = %s Order By created_at DESC limit " + str(limit)
    my_cursor.execute(sql_select_query, (movie_category_name,))
    data = my_cursor.fetchall()
    for data in data:
        data_in_dict = {
            'movie_id': data[0],
            'movie_title': data[2],
            'movie_released': data[7],
            'movie_cover_image': "https://" + data[13] + "/uploads/movie/" + data[3],
            'movie_description': data[10][:150]
        }
        all_data.append(data_in_dict)
    conn.close()
    return jsonify(all_data)



@views.route("/single_category_videos/<category_id>/limit=<limit>", methods=['GET'])
def single_category_videos(category_id, limit):
    all_data = []
    conn = mysql.connector.connect(
        host="178.237.56.73", user="admin_buddy9_qa", password="buddy@9", database="admin_buddy9_qa")
    my_cursor = conn.cursor()
    my_cursor.execute('''
    SELECT * FROM genres_movie
    INNER JOIN movie
    ON movie.id=genres_movie.movie_id AND genres_movie.genres_id = ''' + category_id + ''' AND genres_movie.status=1 AND genres_movie.status = 1
    INNER JOIN genres
    ON genres.id = ''' + category_id + ''' AND genres.status=1 Limit ''' + limit + '''
    ''')
    data = my_cursor.fetchall()
    for data in data:
        data_in_dict = {
            'movie_id': data[2],
            'movie_title': data[9],
            'movie_released': data[14],
            'movie_cover_image': "https://" + data[20] + "/uploads/movie/" + data[10],
            'movie_description': data[17][:150]
        }
        all_data.append(data_in_dict)
    conn.close()
    return jsonify(all_data)

