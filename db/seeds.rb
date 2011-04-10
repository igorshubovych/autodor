# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

Point.create(
  :object_type => 'recreationArea',
  :name => '',
  :lat => 23.893626971,
  :lon => 49.816702906,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 9+995
<div class="features">
<img src="/images/objects/camping.png" title="Кемпінг" alt="Кемпінг" />
<img src="/images/objects/wc.png" title="Туалет" alt="Туалет" />
<img src="/images/objects/recycleBin.png" title="Смітник" alt="Смітник" />
<img src="/images/objects/fireExtinguisher.png" title="Вогнегасник" alt="Вогнегасник" />
</div>
eos
)

Point.create(
  :object_type => 'recreationArea',
  :name => '',
  :lat => 23.777261007,
  :lon => 49.798659498,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 18+614
<div class="features">
<img src="/images/objects/camping.png" title="Кемпінг" alt="Кемпінг" />
<img src="/images/objects/wc.png" title="Туалет" alt="Туалет" />
<img src="/images/objects/recycleBin.png" title="Смітник" alt="Смітник" />
<img src="/images/objects/fireExtinguisher.png" title="Вогнегасник" alt="Вогнегасник" />
</div>
eos
)

Point.create(
  :object_type => 'recreationArea',
  :name => '',
  :lat => 23.484889878,
  :lon => 49.791544311,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 40+189
<div class="features">
<img src="/images/objects/camping.png" title="Кемпінг" alt="Кемпінг" />
<img src="/images/objects/wc.png" title="Туалет" alt="Туалет" />
<img src="/images/objects/recycleBin.png" title="Смітник" alt="Смітник" />
<img src="/images/objects/smokingArea.png" title="Зона для курців" alt="Зона для курців" />
</div>
eos
)

Point.create(
  :object_type => 'hotel',
  :name => 'Готель "Міраж"',
  :lat => 23.351882827,
  :lon => 49.803333804,
  :image => '/images/photos/hotel/hotel1.jpg',
  :description => <<-eos
<div class="poi">
Дорога М-11 Львів – Шегені (на Краків)<br/>

км 50+143<br />
<a href="http://www.hotelmirage.com.ua" target="_blank">Забронювати номер</a><br />
<br />
Тел: +38-03234-37-96-7<br/>
<br/>
<table class="gasPrices">
<tr>
<th>Номери</th>
<th>Ціна (за ніч)</th>
</tr>
<tr class="odd">
<td>Одномістний</td>
<td class="price">$25.00</td>
</tr>
<tr>
<td>Двомісний</td>
<td class="price">$30.00</td>
</tr>
<tr class="odd">
<td>Тримісний</td>
<td class="price">$40.00</td>
</tr>
<tr>
<td>Чотиримісний</td>
<td class="price">$40.00</td>
</tr>
<tr>
<td>Люкс</td>
<td class="price">$55.00</td>
</tr>
</table>
<div class="features">
<img src="/images/icon/coffee.jpg" title="Кава" alt="Кава" />
<img src="/images/icon/shopcart.jpg" title="Магазин" alt="Магазин" />
<img src="/images/icon/wc.jpg" title="Туалет" alt="Туалет" />
<img src="/images/icon/visa.png" title="Приймаються картки" alt="Картки" />
</div>
</div>
eos
)

Point.create(
  :object_type => 'hotel',
  :name => 'Готель "ЗЕВС"',
  :lat => 23.885359492,
  :lon => 49.81546894,
  :image => '/images/photos/hotel/hotel2.jpg',
  :description => <<-eos
<div class="poi">
Дорога М-11 Львів – Шегені (на Краків)<br/>

км 10+336<br />
<a href="http://www.hotelzeus.com.ua" target="_blank">Забронювати номер</a><br />
<br />
Тел: +38-03234-37-96-7<br/>
<br/>
<table class="gasPrices">
<tr>
<th>Номери</th>
<th>Ціна (за ніч)</th>
</tr>
<tr class="odd">
<td>Одномістний</td>
<td class="price">$20.00</td>
</tr>
<tr>
<td>Двомісний</td>
<td class="price">$25.00</td>
</tr>
<tr class="odd">
<td>Тримісний</td>
<td class="price">$30.00</td>
</tr>
<tr>
<td>Чотиримісний</td>
<td class="price">$35.00</td>
</tr>
<tr>
<td>Люкс</td>
<td class="price">$60.00</td>
</tr>
</table>
<div class="features">
<img src="/images/icon/coffee.jpg" title="Кава" alt="Кава" />
<img src="/images/icon/shopcart.jpg" title="Магазин" alt="Магазин" />
<img src="/images/icon/wc.jpg" title="Туалет" alt="Туалет" />
<img src="/images/icon/visa.png" title="Приймаються картки" alt="Картки" />
</div>
</div>
eos
)

Point.create(
  :object_type => 'hotel',
  :name => 'Готель "МАУЕН"',
  :lat => 23.856116392,
  :lon => 49.810993001,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегені (на Краків)<br/>
км 12+606
<div class="object">
<object width="240" height="350" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">
<param value="/img/banners/21.swf" name="movie">
<param value="high" name="quality">
<embed width="240" height="350" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" quality="high" src="http://www.vseoteli.kiev.ua/img/banners/21.swf">
</object>
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'hotel',
  :name => 'Готель "ЗАТИШОК"',
  :lat => 23.775200164,
  :lon => 49.798335898,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегені (на Краків)<br/>
км 19+108
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'hotel',
  :name => 'Готель "БАРОН"',
  :lat => 23.359620582,
  :lon => 49.803425241,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегені (на Краків)<br/>
км 49+706
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'hotel',
  :name => 'Готель "ГОСТИННИЙ ДВІР"',
  :lat => 23.184238279,
  :lon => 49.794088731,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегені (на Краків)<br/>
км 50+543
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'medicine',
  :name => 'Медпункт',
  :lat => 22.968825627,
  :lon => 49.799439944,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 78+999<br/>
вул. Панаса Мирного, 12<br/>
тел. (050) 352-88-77
eos
)

Point.create(
  :object_type => 'police',
  :name => 'КП ДАІ',
  :lat => 23.893626971,
  :lon => 49.816702906,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 9+995
eos
)

Point.create(
  :object_type => 'carService',
  :name => 'СТО РВ Профі',
  :lat => 23.631147816,
  :lon => 49.781530909,
  :image => '/images/photos/carService/carService1.jpg',
  :description => <<-eos
<div class="poi">
Дорога М-11 Львів – Шегині (на Краків)<br/>

км 29+442<br/>
тел. (097) 180-40-18<br/>
Послуги СТО:
<ul class="" style="padding: 0px 5px 0px 20px; margin: 0px;">
<li>діагностика ходової</li>
<li>ремонт ходової</li>
<li>ремонт двигуна</li>
<li>ТО</li>
<li>автоелектрик</li>
</ul>
</div>
eos
)

Point.create(
  :object_type => 'custom',
  :name => 'Митний пост „Шегині”',
  :lat => 22.955382452,
  :lon => 49.799460924,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 66+493
eos
)

Point.create(
  :object_type => 'food',
  :name => 'Авто-гриль "Мисливець"',
  :lat => 23.137390994,
  :lon => 49.793861059,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 66+493
eos
)

Point.create(
  :object_type => 'food',
  :name => 'Кафе-бар "ЛІЛІЯ"',
  :lat => 23.899234588,
  :lon => 49.817843379,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 9+572
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'AЗС "WOG"',
  :lat => 23.9122706681912,
  :lon => 49.820551832,
  :image => '/images/photos/gas/wog1.jpg',
  :description => <<-eos
<div class="poi">
Дорога М-11 Львів – Шегині (на Краків)<br/>

км 8+585<br />
<br />
Тел: (040) 123 45 51<br/>
<br/>
<table class="gasPrices">
<tr>
<th>Пальне</th>
<th>Ціна (грн/л)</th>
</tr>
<tr class="odd">
<td>A-80</td>
<td class="price">9.30</td>
</tr>
<tr>
<td>A-92</td>
<td class="price">9.70</td>
</tr>
<tr class="odd">
<td>A-95</td>
<td class="price">10.05</td>
</tr>
<tr>
<td>ДП</td>
<td class="price">9.50</td>
</tr>
</table>
<div class="features">
<img src="/images/icon/coffee.jpg" title="Кава" alt="Кава" />
<img src="/images/icon/shopcart.jpg" title="Магазин" alt="Магазин" />
<img src="/images/icon/wc.jpg" title="Туалет" alt="Туалет" />
<img src="/images/icon/visa.png" title="Приймаються картки" alt="Картки" />
</div>
</div>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'ЕКСОІЛ УКРНАФТА',
  :lat => 23.902278248,
  :lon => 49.818622607,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 9+336
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'WOG',
  :lat => 23.784085193,
  :lon => 49.799730569,
  :image => '/images/photos/gas/wog2.jpg',
  :description => <<-eos
<div class="poi">
Дорога М-11 Львів – Шегині (на Краків)<br/>

км 18+108<br />
<br />
Тел: (040) 312 45 51<br/>
<br/>
<table class="gasPrices">
<tr>
<th>Пальне</th>
<th>Ціна (грн/л)</th>
</tr>
<tr class="odd">
<td>A-80</td>
<td class="price">9.20</td>
</tr>
<tr>
<td>A-92</td>
<td class="price">9.70</td>
</tr>
<tr class="odd">
<td>A-95</td>
<td class="price">10.00</td>
</tr>
<tr>
<td>ДП</td>
<td class="price">9.50</td>
</tr>
</table>
<div class="features">
<img src="/images/icon/coffee.jpg" title="Кава" alt="Кава" />
<img src="/images/icon/shopcart.jpg" title="Магазин" alt="Магазин" />
<img src="/images/icon/wc.jpg" title="Туалет" alt="Туалет" />
</div>
</div>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'ПЕТРОЛЬ',
  :lat => 23.885359491,
  :lon => 49.815468936,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 10+606
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'ОККО',
  :lat => 23.696874141,
  :lon => 49.787119192,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 24+547
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'УКРНАФТА',
  :lat => 23.631147816,
  :lon => 49.781530909,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 29+442
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'ANP',
  :lat => 23.603877452,
  :lon => 49.782964722,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 31+417
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'ANP',
  :lat => 23.593731811,
  :lon => 49.783819801,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 32+154
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'УКРНАФТА',
  :lat => 23.479607394,
  :lon => 49.791280401,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 40+571
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'РУНО',
  :lat => 23.360743077,
  :lon => 49.803221090,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 49+506
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'БОГДАН-РОСЬ',
  :lat => 23.349266243,
  :lon => 49.803050514,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 50+343
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'МОСТНАФТА',
  :lat => 23.168504296,
  :lon => 49.791373274,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 64+203
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'АЗС "WOG"',
  :lat => 23.140066196,
  :lon => 49.793271440,
  :image => '/images/photos/gas/wog3.jpg',
  :description => <<-eos
<div class="poi">
Дорога М-11 Львів – Шегині (на Краків)<br/>

км 66+289<br />
<br />
Тел: (040) 123 45 51<br/>
<br/>
<table class="gasPrices">
<tr>
<th>Пальне</th>
<th>Ціна (грн/л)</th>
</tr>
<tr class="odd">
<td>A-80</td>
<td class="price">9.30</td>
</tr>
<tr>
<td>A-92</td>
<td class="price">9.70</td>
</tr>
<tr class="odd">
<td>A-95</td>
<td class="price">10.05</td>
</tr>
<tr>
<td>ДП</td>
<td class="price">9.50</td>
</tr>
</table>
<div class="features">
<img src="/images/icon/coffee.jpg" title="Кава" alt="Кава" />
<img src="/images/icon/shopcart.jpg" title="Магазин" alt="Магазин" />
<img src="/images/icon/wc.jpg" title="Туалет" alt="Туалет" />
<img src="/images/icon/visa.png" title="Приймаються картки" alt="Картки" />
</div>
</div>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'ГАЛИЧИНА',
  :lat => 23.118610940,
  :lon => 49.798044730,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 67+923
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'УКРНАФТА',
  :lat => 23.043942335,
  :lon => 49.801685175,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 73+477
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'OKKO',
  :lat => 23.035849811,
  :lon => 49.800623513,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 74+072
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'АЗС "WOG"',
  :lat => 23.002914158,
  :lon => 49.799072016,
  :image => '/images/photos/gas/wog4.jpg',
  :description => <<-eos
<div class="poi">
Дорога М-11 Львів – Шегині (на Краків)<br/>

км 76+487<br />
<br />
Тел: (040) 123 45 51<br/>
<br/>
<table class="gasPrices">
<tr>
<th>Пальне</th>
<th>Ціна (грн/л)</th>
</tr>
<tr class="odd">
<td>A-80</td>
<td class="price">9.30</td>
</tr>
<tr>
<td>A-92</td>
<td class="price">9.70</td>
</tr>
<tr class="odd">
<td>A-95</td>
<td class="price">10.05</td>
</tr>
<tr>
<td>ДП</td>
<td class="price">9.50</td>
</tr>
</table>
<div class="features">
<img src="/images/icon/coffee.jpg" title="Кава" alt="Кава" />
<img src="/images/icon/shopcart.jpg" title="Магазин" alt="Магазин" />
<img src="/images/icon/wc.jpg" title="Туалет" alt="Туалет" />
<img src="/images/icon/visa.png" title="Приймаються картки" alt="Картки" />
</div>
</div>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'ANP',
  :lat => 23.001186298,
  :lon => 49.799131280,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 76+611
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'ЛУКОЙЛ',
  :lat => 22.994816783,
  :lon => 49.799400377,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 77+071
<p>Інформація не надана власником.</p>
eos
)

Point.create(
  :object_type => 'gas',
  :name => 'РУНО',
  :lat => 22.968825627,
  :lon => 49.799439944,
  :image => '',
  :description => <<-eos
Дорога М-11 Львів – Шегині (на Краків)<br/>
км 77+071
<p>Інформація не надана власником.</p>
eos
)