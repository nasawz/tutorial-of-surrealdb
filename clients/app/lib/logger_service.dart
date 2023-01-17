import 'package:get/get.dart';
import 'package:logger/logger.dart';

class LoggerService extends GetxService {
  static LoggerService get to => Get.find();

  late Logger logger;

  Future<LoggerService> init() async {
    logger = Logger(
      filter: null,
      printer: PrettyPrinter(),
      output: null,
    );

    return this;
  }
}
