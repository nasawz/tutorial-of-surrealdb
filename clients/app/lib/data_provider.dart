import 'package:app/base_provider.dart';
import 'package:get/get.dart';

class DataProvider extends BaseProvider {
  Future<Response> getProjects() => post('', "select * from project;");
}
