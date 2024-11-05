 GET |Cценарий | Тестовые данные|Ожидаемый результат
-----|---|---|----
| 1   |Проверка получения apiKey и код 200 при отправке запроса с корректными параметрами|orderId = { 1..10},api_key = '1234567890123456'|Код ответа 200/поле 'apiKey'
| 2   |Проверка получения кода ответа 400 при отправке запроса с некорректными данными|orderId>10,orderId<1,символ вместо orderId,нет orderId|Код ответа 400
 
PUT |Cценарий | Тестовые данные|Ожидаемый результат
 ---|---|---|----
| 1   |Проверка обновления заказа с корректными данными и API key|orderId = { 1..10},api_key = '1234567890123456'|Код ответа 200
| 2   |Проверка обновления заказа с некорректным API key|api_key< 16 цифр, api_key> 16 цифр(например '123456789012345')|Код ответа 401
| 3   |Проверка обновления заказа с некорректными order Id |orderId >10, orderId<1,символ, нет значения|Код ответа 400
| 4 |Проверка обновления заказа при отсутствии значений в полях обязательных для заполнения|---|Код ответа 400
| 5 |Проверка обновления заказа при отсутствии order Id|отсутствует order Id|Код ответа 405

|DELETE|Cценарий| Тестовые данные|Ожидаемый результат
 ---|---|---|----
|1. |Проверка удаления заказа  при запросе с корректным ID и корректным API key|orderId = { 1..10},api_key = '1234567890123456'|Код ответа 204
|2. |Проверка удаления заказа  при запросе с пустым order Id и корректным API key|orderId  отсутствует  ,api_key = '1234567890123456'|Код ответа 405
|3. |Проверка удаления заказа  при запросе с некорректным order Id и корректным API key|orderId >10, orderId<1,символ, нет значения|Код ответа 400
|4. |Проверка удаления заказа  при запросе c некорректным API key|api_key< 16 цифр, api_key> 16 цифр(например '123456789012345')|Код ответа 401
