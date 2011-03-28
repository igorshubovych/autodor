﻿var cities = [ "Авдіївка", "Алмазна", "Алупка", "Алушта", "Алчевськ", 
"Амвросіївка", "Ананьїв", "Андрушівка", "Антрацит", "Апостолове", 
"Армянськ", "Артемівськ", "Артемівськ", "Артемове", "Арциз", 
"Балаклія", "Балта", "Бар", "Баранівка", "Барвінкове", 
"Бахмач", "Бахчисарай", "Баштанка", "Белз", "Бердичів", 
"Бердянськ", "Берегове", "Бережани", "Березань", "Березівка", 
"Березне", "Берестечко", "Берислав", "Бершадь", "Бібрка", 
"Біла", "Білгород-Дністровський", "Білицьке", "Білогірськ", "Білозерське", "Білопілля", 
"Біляївка", "Бобринець", "Бобровиця", "Богодухів", "Богуслав", 
"Болград", "Болехів", "Борзна", "Борислав", "Бориспіль", 
"Борщів", "Боярка", "Бровари", "Броди", "Брянка", 
"Буринь", "Бурштин", "Буськ", "Бучач", "Валки", 
"Василівка", "Васильків", "Ватутіне", "Вахрушеве", "Вашківці", 
"Великі", "Верхівцеве", "Верхньодніпровськ", "Вижниця", "Вилкове", 
"Винники", "Виноградів", "Вишгород", "Вишневе", "Вільногірськ", 
"Вільнянськ", "Вінниця", "Вовчанськ", "Вознесенськ", "Волноваха", 
"Володимир-Волинський", "Волочиськ", "Ворожба", "Вуглегірськ", "Вугледар", 
"Гадяч", "Гайворон", "Гайсин", "Галич", "Генічеськ", 
"Герца", "Гірник", "Гірське", "Глиняни", "Глобине", 
"Глухів", "Гнівань", "Гола", "Горлівка", "Городенка", 
"Городище", "Городня", "Городок", "Городок", "Горохів", 
"Гребінка", "Гуляйполе", "Дебальцеве", "Деражня", "Дергачі", 
"Джанкой", "Дзержинськ", "Димитров", "Дніпродзержинськ", "Дніпропетровськ", 
"Дніпрорудне", "Добромиль", "Добропілля", "Докучаєвськ", "Долина", 
"Долинська", "Донецьк", "Дрогобич", "Дружба", "Дружківка", 
"Дубляни", "Дубно", "Дубровиця", "Дунаївці", "Енергодар", 
"Євпаторія", "Єнакієве", "Жашків", "Жданівка", "Жидачів", 
"Житомир", "Жмеринка", "Жовква", "Жовті", "Заліщики", 
"Запоріжжя", "Заставна", "Збараж", "Зборів", "Звенигородка", 
"Здолбунів", "Зеленодольськ", "Зимогір'я", "Зіньків", "Зміїв", "Знам'янка", "Золоте", "Золотоноша", "Золочів", "Зоринськ", 
"Зугрес", "Івано-Франківськ", "Ізмаїл", "Ізюм", "Ізяслав", "Іллінці", 
"Іллічівськ", "Іловайськ", "Інгулець", "Інкерман", "Ірміно", 
"Ірпінь", "Іршава", "Ічня", "Кагарлик", "Калинівка", 
"Калуш", "Кам'янець-Подільський", "Кам'янка-Бузька", "Кам'янка-Дніпровська", "Кам'янка", "Камінь-Каширський", "Канів", "Карлівка", "Каховка", "Керч", 
"КИЇВ", "Ківерці", "Кілія", "Кіровоград", "Кіровськ", 
"Кіровське", "Кіцмань", "Кобеляки", "Ковель", "Кодима", 
"Козятин", "Коломия", "Комарно", "Комсомольськ", "Комсомольське", 
"Конотоп", "Копичинці", "Корець", "Коростень", "Коростишів", 
"Корсунь-Шевченківський", "Корюківка", "Косів", "Костопіль", "Костянтинівка", 
"Котовськ", "Краматорськ", "Красилів", "Красний", "Красний", 
"Красноармійськ", "Красногорівка", "Красноград", "Краснодон", "Красноперекопськ", 
"Кременець", "Кременчук", "Кремінна", "Кривий", "Кролевець", 
"Кузнецовськ", "Куп'янськ", "Курахове", "Ладижин", "Ланівці", "Лебедин", 
"Липовець", "Лисичанськ", "Лозова", "Лохвиця", "Лубни", 
"Луганськ", "Лутугине", "Луцьк", "Львів", "Любомль", 
"Люботин", "Макіївка", "Мала", "Малин", "Мар'їнка", "Марганець", "Маріуполь", "Мелітополь", "Мена", 
"Мерефа", "Миколаїв", "Миколаїв", "Миколаївка", "Миргород", 
"Миронівка", "Міусинськ", "Могилів-Подільський", "Молодогвардійськ", "Молочанськ", "Монастириська", "Монастирище", 
"Моршин", "Моспине", "Мостиська", "Мукачеве", "Надвірна", 
"Немирів", "Нетішин", "Ніжин", "Нікополь", "Нова", 
"Нова", "Новгород-Сіверський", "Новий", "Новий", "Новий", "Новоазовськ", 
"Нововолинськ", "Новоград-Волинський", "Новогродівка", "Новодністровськ", "Новодружеськ", "Новомиргород", 
"Новомосковськ", "Новоселиця", "Новоукраїнка", "Новояворівськ", "Носівка", 
"Обухів", "Овруч", "Одеса", "Олевськ", "Олександрівськ", 
"Олександрія", "Орджонікідзе", "Оріхів", "Остер", "Острог", 
"Охтирка", "Очаків", "П'ятихатки", "Павлоград", "Первомайськ", "Первомайськ", "Первомайський", 
"Перевальськ", "Перемишляни", "Перечин", "Перещепине", "Переяслав-Хмельницький", "Першотравенськ", "Петровське", "Пирятин", "Південне", 
"Підгайці", "Підгородне", "Погребище", "Пологи", "Полонне", 
"Полтава", "Помічна", "Попасна", "Почаїв", "Привілля", 
"Прилуки", "Приморськ", "Прип'ять", "Пустомити", "Путивль", "Рава-Руська", "Радехів", "Радивилів", "Радомишль", "Рахів", 
"Рені", "Ржищів", "Рівне", "Ровеньки", "Рогатин", 
"Родинське", "Рожище", "Роздільна", "Ромни", "Рубіжне", 
"Рудки", "Саки", "Самбір", "Сарни", "Свалява", 
"Сватове", "Свердловськ", "Світловодськ", "Світлодарськ", "Святогірськ", 
"Севастополь", "Селидове", "Семенівка", "Середина-Буда", "Сєвєродонецьк", "Синельникове", "Сіверськ", "Сімферополь", 
"Скадовськ", "Скалат", "Сквира", "Сколе", "Славута", 
"Славутич", "Слов'янськ", "Сміла", "Снігурівка", "Сніжне", "Снятин", 
"Сокаль", "Сокиряни", "Соледар", "Соснівка", "Старий", 
"Старий", "Старобільськ", "Старокостянтинів", "Стаханов", "Стебник", 
"Сторожинець", "Стрий", "Судак", "Судова", "Суми", 
"Суходільськ", "Таврійськ", "Тальне", "Тараща", "Татарбунари", 
"Теплодар", "Теребовля", "Тернівка", "Тернопіль", "Тетіїв", 
"Тисмениця", "Тлумач", "Токмак", "Торез", "Тростянець", 
"Трускавець", "Тульчин", "Турка", "Тячів", "Угнів", 
"Ужгород", "Узин", "Українка", "Українськ", "Ульяновка", 
"Умань", "Устилуг", "Фастів", "Феодосія", "Харків", 
"Харцизьк", "Херсон", "Хирів", "Хмельницький", "Хмільник", 
"Ходорів", "Хорол", "Хоростків", "Хотин", "Христинівка", 
"Хуст", "Цюрупинськ", "Часів", "Червоноград", "Червонозаводське", 
"Червонопартизанськ", "Черкаси", "Чернівці", "Чернігів", "Чигирин", 
"Чоп", "Чорнобиль", "Чортків", "Чугуїв", "Шаргород", 
"Шахтарськ", "Шепетівка", "Шостка", "Шпола", "Шумськ", 
"Щастя", "Щолкіне", "Щорс", "Южне", "Южноукраїнськ", 
"Юнокомунарівськ", "Яворів", "Яготин", "Ялта", "Ямпіль", 
"Яремче", "Ясинувата" ];