from flask import Blueprint, jsonify, request
import random, mysql.connector, requests

auth = Blueprint('auth', __name__)


entered_mobile_number = ""
generated_otp = ""


# @auth.route('/login_process', methods=['POST','GET'])
# def login():
#     conn = mysql.connector.connect(host="178.237.56.73", user="admin_buddy9_qa", password="buddy@9", database="admin_buddy9_qa")
#     my_cursor = conn.cursor()
#     my_cursor.execute("select * from admin_buddy9_qa.members where mobile=9870915812")
#     data = my_cursor.fetchone()
#     conn.close()
#     return jsonify({"info":data})



@auth.route('/login_process', methods=['POST'])
def login(): 
    global generated_otp, entered_mobile_number
    entered_mobile_number = request.json['LoginMobileNumber']
    generate_otp = requests.get("https://2factor.in/API/V1/e22905d7-a75a-11ec-a4c2-0200cd936042/SMS//+91" + entered_mobile_number + "/AUTOGEN")
    result_convert_to_json = generate_otp.json()
    generated_otp = result_convert_to_json.get("Details")
    if result_convert_to_json.get("Status") == "Success":
        return jsonify({"info": "success"})
    else:
        return jsonify({"info": result_convert_to_json.get("Status")})



@auth.route('/confirm_otp_process/<user_otp>', methods=['POST','GET'])
def confirm_otp_process(user_otp):
    global generated_otp, entered_mobile_number
    UserDetail = ""
    token = str(random.randint(0, 100))
    generate_otp = requests.get("https://2factor.in/API/V1/e22905d7-a75a-11ec-a4c2-0200cd936042/SMS/VERIFY/" + generated_otp + "/" + user_otp)
    result_convert_to_json = generate_otp.json()
    databaseDetails = mysql.connector.connect(host="178.237.56.73", user="admin_buddy9_qa", password="buddy@9", database="admin_buddy9_qa")
    my_cursor = databaseDetails.cursor()
    my_cursor.execute("SELECT * FROM members WHERE mobile = " + str(entered_mobile_number))
    CheckingDataExistsOrNot = my_cursor.fetchone()
    if CheckingDataExistsOrNot != None:
        my_cursor.execute("UPDATE members SET token = " + str(token) + " WHERE mobile = " + str(entered_mobile_number))
        databaseDetails.commit()
        my_cursor.execute("SELECT * FROM members WHERE mobile = " + str(entered_mobile_number))
        UpdatedUser = my_cursor.fetchone()
        UserDetail = UpdatedUser
    else:
        my_cursor.execute("INSERT INTO members (mobile, token) values(" + str(entered_mobile_number) + ","+ token + ")")
        databaseDetails.commit()
        my_cursor.execute("SELECT * FROM members WHERE mobile = " + str(entered_mobile_number))
        NewUser = my_cursor.fetchone()
        UserDetail = NewUser
    databaseDetails.close()
    if result_convert_to_json.get("Details") == "OTP Matched":
        return jsonify({"info": "success", "UserDetail" : UserDetail})
    else:
        return jsonify({"info": result_convert_to_json.get("Details")})


@auth.route('/check_user_login_in_one_device_or_not', methods=['POST'])
def check_user_login_in_one_device_or_not():
    output = ""
    databaseDetails = mysql.connector.connect(host="178.237.56.73", user="admin_buddy9_qa", password="buddy@9", database="admin_buddy9_qa")
    my_cursor = databaseDetails.cursor()
    my_cursor.execute("SELECT * FROM members WHERE mobile = " + str(request.json['UserMobileNumber']))
    UserLoginInSingleDeviceOutput = my_cursor.fetchone()
    if UserLoginInSingleDeviceOutput != None:
        if UserLoginInSingleDeviceOutput[3] == str(request.json['UserLoginToken']):
          output = "no"
        else:  
            output = "yes"
    else:
        output = "yes"
    databaseDetails.close()
    return jsonify({"output" : output})








