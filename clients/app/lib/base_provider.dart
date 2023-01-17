import 'dart:async';

// import 'package:app/logger_service.dart';
import 'package:get/get_connect.dart';
import 'package:get/get_connect/http/src/request/request.dart';

class BaseProvider extends GetConnect {
  // TODO !!! not work
  FutureOr<Request> authInterceptor(request) async {
    final token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NzM5NDEwMDAsIm5iZiI6MTY3Mzk0MTAwMCwiZXhwIjoxNjc0MDI3NDAwLCJpc3MiOiJTdXJyZWFsREIiLCJOUyI6InRlc3QiLCJEQiI6InRlc3QiLCJTQyI6ImFjY291bnQiLCJJRCI6InVzZXI6cmxueHhremJ6YmcyNnNua3dpbnAifQ.O8Z0MVvjbO05fg7DKnNIAOMQjWXAUpkK0RtzG2fForzQswB0w0Ycxq9MmqrTHB-kD6LKJA24tir7TjVRVrQNlw";
    var headers = {'Authorization': "Bearer $token"};
    request.headers.addAll(headers);

    return request;
  }

  @override
  void onInit() {
    httpClient.baseUrl = "http://152.136.153.160:8000/sql";
    httpClient.timeout = Duration(seconds: 60);
    // httpClient.addAuthenticator(authInterceptor);
    httpClient.addRequestModifier<void>((request) {
      request.headers['Accept'] = "application/json";
      request.headers['NS'] = "test";
      request.headers['DB'] = "test";
      final token =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NzM5NDEwMDAsIm5iZiI6MTY3Mzk0MTAwMCwiZXhwIjoxNjc0MDI3NDAwLCJpc3MiOiJTdXJyZWFsREIiLCJOUyI6InRlc3QiLCJEQiI6InRlc3QiLCJTQyI6ImFjY291bnQiLCJJRCI6InVzZXI6cmxueHhremJ6YmcyNnNua3dpbnAifQ.O8Z0MVvjbO05fg7DKnNIAOMQjWXAUpkK0RtzG2fForzQswB0w0Ycxq9MmqrTHB-kD6LKJA24tir7TjVRVrQNlw";
      var headers = {'Authorization': "Bearer $token"};
      request.headers.addAll(headers);
      return request;
    });
  }
}
