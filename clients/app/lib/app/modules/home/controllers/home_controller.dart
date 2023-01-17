import 'package:app/data_provider.dart';
import 'package:app/logger_service.dart';
import 'package:get/get.dart';

class HomeController extends GetxController {
  final provider = Get.find<DataProvider>();

  final count = 0.obs;
  @override
  void onInit() {
    super.onInit();
    loadData();
  }

  Future<void> loadData() async {
    final Response res = await provider.getProjects();
    LoggerService.to.logger.d(res.body);
  }

  @override
  void onReady() {
    super.onReady();
  }

  @override
  void onClose() {}
  void increment() => count.value++;
}
