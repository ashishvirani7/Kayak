var connection =  new require('./kafka/Connection');
var login = require('./services/login');

var addHotelAdmin = require('./services/addHotelAdmin');
var updateHotelAdmin = require('./services/updateHotelAdmin');

var addFlightAdmin = require('./services/addFlightAdmin');
var updateFlightAdmin = require('./services/updateFlightAdmin');

var addCarAdmin = require('./services/addCarAdmin');
var updateCarAdmin = require('./services/updateCarAdmin');


var updateUserInfo = require('./services/updateUserInfo');
var signup = require('./services/signup');
var create_folder = require('./services/createFolder');
var delete_folder = require('./services/deleteFolder');
var upload_file = require('./services/uploadFile');
var delete_file = require('./services/deleteFile');
var download_file = require('./services/downloadFile');
var get_files = require('./services/getFiles');
var get_folders = require('./services/getFolders');
var star_file = require('./services/starFile');
var unstar_file = require('./services/unStarFile');
var star_folder = require('./services/starFolder');
var unstar_folder = require('./services/unStarFolder');
var get_activity = require('./services/getActivity');
var share = require('./services/share');
var get_shared_files = require('./services/getSharedFiles');
var delete_user = require('./services/deleteUser')

var hotels = require('./services/hotels');
var flights = require('./services/flights');
var cars = require('./services/cars');

var add_hotel_admin_topic_name = 'add_hotel_admin_topic';
var update_hotel_admin_topic_name = 'update_hotel_admin_topic';

var add_flight_admin_topic_name = 'add_flight_admin_topic';
var update_flight_admin_topic_name = 'update_flight_admin_topic';

var add_car_admin_topic_name = 'add_car_admin_topic';
var update_car_admin_topic_name = 'update_car_admin_topic';

var login_topic_name = 'login_topic';
var signup_topic_name = "signup_topic";
var updateUserInfo_topic_name = 'updateUserInfo_topic';
var create_folder_topic_name = "create_folder_topic";
var delete_folder_topic_name = "delete_folder_topic";
var upload_file_topic_name = "upload_file_topic";
var delete_file_topic_name = "delete_file_topic";
var download_file_topic_name = "download_file_topic";
var get_files_topic_name = "get_files_topic";
var get_folders_topic_name = "get_folders_topic";
var star_file_topic_name = "star_file_topic";
var unstar_file_topic_name = "unstar_file_topic";
var star_folder_topic_name = "star_folder_topic";
var unstar_folder_topic_name = "unstar_folder_topic";
var get_activity_topic_name = "get_activity_topic";
var share_topic_name = "share_topic";
var get_shared_files_topic_name = "get_shared_files_topic";

var delete_user_topic_name = "delete_user_topic";
var hotels_topic = "hotels_topic";
var flights_topic = "flights_topic";
var cars_topic = "cars_topic";

var response_topic_name = "response_topic";

var producer = connection.getProducer();

producer.on('ready', function () {
    producer.createTopics([login_topic_name,signup_topic_name,create_folder_topic_name, delete_folder_topic_name,
            upload_file_topic_name, delete_file_topic_name, download_file_topic_name, get_files_topic_name,
            get_folders_topic_name, response_topic_name, star_file_topic_name, unstar_file_topic_name,
            star_folder_topic_name, unstar_folder_topic_name, get_activity_topic_name, share_topic_name,
            get_shared_files_topic_name, updateUserInfo_topic_name, hotels_topic, flights_topic, cars_topic,
            delete_user_topic_name, add_hotel_admin_topic_name, update_hotel_admin_topic_name,
            add_flight_admin_topic_name, update_flight_admin_topic_name, add_car_admin_topic_name,
            update_car_admin_topic_name
        ],
        false, function (err, data) {
        });
    var login_consumer = connection.getConsumer(login_topic_name);
    var updateUserInfo_consumer = connection.getConsumer(updateUserInfo_topic_name);

    var add_hotel_admin_consumer = connection.getConsumer(add_hotel_admin_topic_name);
    var update_hotel_admin_consumer = connection.getConsumer(update_hotel_admin_topic_name);

    var add_flight_admin_consumer = connection.getConsumer(add_flight_admin_topic_name);
    var update_flight_admin_consumer = connection.getConsumer(update_flight_admin_topic_name);

    var add_car_admin_consumer = connection.getConsumer(add_car_admin_topic_name);
    var update_car_admin_consumer = connection.getConsumer(update_car_admin_topic_name);



    var signup_consumer = connection.getConsumer(signup_topic_name);
    var create_folder_consumer = connection.getConsumer(create_folder_topic_name);
    var delete_folder_consumer = connection.getConsumer(delete_folder_topic_name);
    var upload_file_consumer =  connection.getConsumer(upload_file_topic_name);
    var delete_file_consumer = connection.getConsumer(delete_file_topic_name);
    var download_file_consumer = connection.getConsumer(download_file_topic_name);
    var get_files_consumer = connection.getConsumer(get_files_topic_name);
    var get_folders_consumer = connection.getConsumer(get_folders_topic_name);
    var star_file_consumer =connection.getConsumer(star_file_topic_name);
    var unstar_file_consumer = connection.getConsumer(unstar_file_topic_name);
    var star_folder_consumer =connection.getConsumer(star_folder_topic_name);
    var unstar_folder_consumer = connection.getConsumer(unstar_folder_topic_name);
    var get_activity_consumer = connection.getConsumer(get_activity_topic_name);
    var share_consumer = connection.getConsumer(share_topic_name);
    var get_shared_files_consumer = connection.getConsumer(get_shared_files_topic_name);
    var hotels_topic_consumer = connection.getConsumer(hotels_topic);
    var flights_topic_consumer = connection.getConsumer(flights_topic);
    var cars_topic_consumer = connection.getConsumer(cars_topic);
    var delete_user_topic_consumer = connection.getConsumer(delete_user_topic_name);

    console.log('login server is running');
    login_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        login.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('signup server is running');
    signup_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        signup.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('updateUserInfo server is running');
    updateUserInfo_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateUserInfo.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('create folder server is running');
    create_folder_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        create_folder.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('delete folder server is running');
    delete_folder_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        delete_folder.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('upload file server is running');
    upload_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        upload_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('delete file server is running');
    delete_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        delete_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('download file server is running');
    download_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        download_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('get files server is running');
    get_files_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        get_files.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('get folders server is running');
    get_folders_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        get_folders.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('star file server is running');
    star_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        star_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('unstar file server is running');
    unstar_file_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        unstar_file.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('star folder server is running');
    star_folder_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        star_folder.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('unstar folder server is running');
    unstar_folder_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        unstar_folder.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('get activity server is running');
    get_activity_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        get_activity.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('share server is running');
    share_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        share.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('share server is running');
    get_shared_files_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        get_shared_files.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('Add Hotel server is running');
    add_hotel_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        addHotelAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Update Hotel server is running');
    update_hotel_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateHotelAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('Add Flight server is running');
    add_flight_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        addFlightAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Update Flight server is running');
    update_flight_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateFlightAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Add Car server is running');
    add_car_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        addCarAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('Update Car server is running');
    update_car_admin_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        updateCarAdmin.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });


    console.log('hotels server is running');
    hotels_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        if(data.data.key == "search"){
            hotels.handle_request(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }
        else if(data.data.key == "book"){
            hotels.handle_booking(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }

    });

    console.log('flights server is running');
    flights_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        if(data.data.key == "search"){
            flights.handle_request(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }

        else if(data.data.key == "book"){
            flights.handle_booking(data.data, function(err,res){
                console.log('after handle'+res);
                var payloads = [
                    { topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0
                    }
                ];
                producer.send(payloads, function(err, data){
                    console.log(data);
                });
                return;
            });
        }



    });

    console.log('cars server is running');
    cars_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        cars.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });

    console.log('delete user server is running');
    delete_user_topic_consumer.on('message', function (message) {
        console.log('message received');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        delete_user.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    });
});