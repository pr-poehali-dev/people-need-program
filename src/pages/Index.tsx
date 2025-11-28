import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
  items: CartItem[];
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'cart' | 'account' | 'contacts' | 'delivery' | 'reviews'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const products: Product[] = [
    { id: 1, name: 'Смартфон Premium X1', price: 89990, category: 'Электроника', image: 'https://cdn.poehali.dev/projects/bbbbb8c1-b403-4746-be86-b6f1e29fc388/files/04af211a-e999-4bec-8d97-6682bf5ace2f.jpg', description: 'Флагманский смартфон с передовыми технологиями' },
    { id: 2, name: 'Ноутбук ProBook 15', price: 124990, category: 'Электроника', image: 'https://cdn.poehali.dev/projects/bbbbb8c1-b403-4746-be86-b6f1e29fc388/files/bd573247-2f78-4be2-ad55-29b8a1a93ad8.jpg', description: 'Мощный ноутбук для работы и развлечений' },
    { id: 3, name: 'Наушники AirSound', price: 12990, category: 'Аксессуары', image: 'https://cdn.poehali.dev/projects/bbbbb8c1-b403-4746-be86-b6f1e29fc388/files/61cc8e6e-63c3-4faf-a78d-9cb48e45dd2e.jpg', description: 'Беспроводные наушники с шумоподавлением' },
    { id: 4, name: 'Умные часы FitTime', price: 24990, category: 'Аксессуары', image: '/placeholder.svg', description: 'Фитнес-трекер с множеством функций' },
    { id: 5, name: 'Планшет TabPro 11', price: 54990, category: 'Электроника', image: '/placeholder.svg', description: 'Планшет для работы и творчества' },
    { id: 6, name: 'Чехол для телефона', price: 1990, category: 'Аксессуары', image: '/placeholder.svg', description: 'Прочный защитный чехол' },
  ];

  const orders: Order[] = [
    {
      id: 1001,
      date: '15.11.2024',
      total: 89990,
      status: 'Доставлен',
      items: [{ ...products[0], quantity: 1 }]
    },
    {
      id: 1002,
      date: '20.11.2024',
      total: 37980,
      status: 'В пути',
      items: [{ ...products[2], quantity: 1 }, { ...products[3], quantity: 1 }]
    },
  ];

  const categories = ['Все', 'Электроника', 'Аксессуары'];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const Navigation = () => (
    <nav className="bg-primary text-primary-foreground shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Icon name="Store" size={24} />
            <span className="text-xl font-semibold">TechStore</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="hover:text-accent transition-colors">Главная</button>
            <button onClick={() => setCurrentPage('catalog')} className="hover:text-accent transition-colors">Каталог</button>
            <button onClick={() => setCurrentPage('delivery')} className="hover:text-accent transition-colors">Доставка</button>
            <button onClick={() => setCurrentPage('reviews')} className="hover:text-accent transition-colors">Отзывы</button>
            <button onClick={() => setCurrentPage('contacts')} className="hover:text-accent transition-colors">Контакты</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentPage('cart')} className="relative hover:text-accent transition-colors">
              <Icon name="ShoppingCart" size={24} />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-accent">{cartCount}</Badge>
              )}
            </button>
            <button onClick={() => setCurrentPage('account')} className="hover:text-accent transition-colors">
              <Icon name="User" size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Добро пожаловать в TechStore</h1>
            <p className="text-xl mb-8 opacity-90">Премиальная техника и аксессуары для вашего бизнеса и жизни</p>
            <Button onClick={() => setCurrentPage('catalog')} size="lg" className="bg-accent hover:bg-accent/90">
              Перейти в каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardContent className="p-6 text-center">
                <Icon name="Truck" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-muted-foreground">Доставка по всей России за 1-3 дня</p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="p-6 text-center">
                <Icon name="Shield" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
                <p className="text-muted-foreground">Официальная гарантия на всю продукцию</p>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardContent className="p-6 text-center">
                <Icon name="Headphones" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
                <p className="text-muted-foreground">Всегда на связи для решения ваших вопросов</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Популярные товары</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {products.slice(0, 3).map(product => (
              <Card key={product.id} className="hover-scale overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-accent mb-4">{product.price.toLocaleString()} ₽</p>
                  <Button onClick={() => addToCart(product)} className="w-full">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const CatalogPage = () => (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Каталог товаров</h1>
      
      <div className="mb-8 flex gap-3">
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="hover-scale overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <Badge className="mb-2">{product.category}</Badge>
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-accent">{product.price.toLocaleString()} ₽</span>
                <Button onClick={() => addToCart(product)}>
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  В корзину
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Корзина покупок</h1>
      
      {cart.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground mb-4">Ваша корзина пуста</p>
            <Button onClick={() => setCurrentPage('catalog')}>Перейти в каталог</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-accent font-bold mb-2">{item.price.toLocaleString()} ₽</p>
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Icon name="Minus" size={16} />
                      </Button>
                      <span className="font-semibold">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="h-fit">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Итого</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товаров:</span>
                  <span>{cartCount} шт.</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Сумма:</span>
                  <span className="text-accent">{cartTotal.toLocaleString()} ₽</span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                <Icon name="Check" size={20} className="mr-2" />
                Оформить заказ
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  const AccountPage = () => (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Личный кабинет</h1>
      
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">История заказов</TabsTrigger>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          {orders.map(order => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Заказ №{order.id}</h3>
                    <p className="text-sm text-muted-foreground">от {order.date}</p>
                  </div>
                  <Badge variant={order.status === 'Доставлен' ? 'default' : 'secondary'}>
                    {order.status}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">Итого:</span>
                  <span className="text-2xl font-bold text-accent">{order.total.toLocaleString()} ₽</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input placeholder="Иван Иванов" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Телефон</label>
                <Input type="tel" placeholder="+7 (999) 123-45-67" />
              </div>
              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const ContactsPage = () => (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Контакты</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Icon name="MapPin" size={24} className="text-accent mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Адрес</h3>
                <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Icon name="Phone" size={24} className="text-accent mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Телефон</h3>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Icon name="Mail" size={24} className="text-accent mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">info@techstore.ru</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Icon name="Clock" size={24} className="text-accent mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Режим работы</h3>
                <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00<br />Сб-Вс: 10:00 - 18:00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Напишите нам</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <Input placeholder="Ваше имя" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Сообщение</label>
                <Input placeholder="Ваше сообщение" />
              </div>
              <Button className="w-full">
                <Icon name="Send" size={16} className="mr-2" />
                Отправить
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const DeliveryPage = () => (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Доставка и оплата</h1>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="Truck" size={32} className="text-accent" />
              <div>
                <h3 className="text-2xl font-semibold mb-2">Способы доставки</h3>
                <p className="text-muted-foreground mb-4">Мы предлагаем несколько вариантов доставки для вашего удобства</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold mb-1">Курьерская доставка</h4>
                <p className="text-sm text-muted-foreground">По Москве - 300 ₽, 1-2 дня<br />По России - от 500 ₽, 2-5 дней</p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold mb-1">Самовывоз</h4>
                <p className="text-sm text-muted-foreground">Бесплатно из нашего офиса в Москве</p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-semibold mb-1">Постамат</h4>
                <p className="text-sm text-muted-foreground">Доставка в постаматы PickPoint - 250 ₽</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Icon name="CreditCard" size={32} className="text-accent" />
              <div>
                <h3 className="text-2xl font-semibold mb-2">Способы оплаты</h3>
                <p className="text-muted-foreground mb-4">Выберите удобный для вас способ оплаты</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <Icon name="CreditCard" size={24} className="text-accent mb-2" />
                <h4 className="font-semibold mb-1">Банковская карта</h4>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, МИР</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <Icon name="Wallet" size={24} className="text-accent mb-2" />
                <h4 className="font-semibold mb-1">Электронные деньги</h4>
                <p className="text-sm text-muted-foreground">ЮMoney, QIWI, WebMoney</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <Icon name="Banknote" size={24} className="text-accent mb-2" />
                <h4 className="font-semibold mb-1">Наличные</h4>
                <p className="text-sm text-muted-foreground">При получении курьеру</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <Icon name="Building" size={24} className="text-accent mb-2" />
                <h4 className="font-semibold mb-1">Для юр. лиц</h4>
                <p className="text-sm text-muted-foreground">Безналичный расчет по счету</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ReviewsPage = () => (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Отзывы клиентов</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { name: 'Александр П.', rating: 5, text: 'Отличный магазин! Быстрая доставка, качественный товар. Рекомендую!', date: '15.11.2024' },
          { name: 'Мария К.', rating: 5, text: 'Заказывала ноутбук, пришел через день. Все работает отлично, спасибо!', date: '18.11.2024' },
          { name: 'Дмитрий С.', rating: 4, text: 'Хороший выбор товаров, адекватные цены. Буду заказывать еще.', date: '20.11.2024' },
          { name: 'Елена В.', rating: 5, text: 'Профессиональная поддержка, помогли с выбором. Очень довольна!', date: '22.11.2024' },
        ].map((review, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{review.name}</h3>
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-accent text-accent" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-2">{review.text}</p>
              <p className="text-sm text-muted-foreground">{review.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Оставить отзыв</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Имя</label>
              <Input placeholder="Ваше имя" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Оценка</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} type="button" className="text-2xl hover:text-accent transition-colors">
                    <Icon name="Star" size={24} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Отзыв</label>
              <Input placeholder="Ваш отзыв" />
            </div>
            <Button>Отправить отзыв</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const Footer = () => (
    <footer className="bg-primary text-primary-foreground mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Store" size={24} />
              <span className="text-xl font-semibold">TechStore</span>
            </div>
            <p className="text-sm opacity-80">Премиальная техника для вашего бизнеса</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Каталог</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p className="cursor-pointer hover:text-accent transition-colors">Электроника</p>
              <p className="cursor-pointer hover:text-accent transition-colors">Аксессуары</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p className="cursor-pointer hover:text-accent transition-colors" onClick={() => setCurrentPage('delivery')}>Доставка</p>
              <p className="cursor-pointer hover:text-accent transition-colors" onClick={() => setCurrentPage('contacts')}>Контакты</p>
              <p className="cursor-pointer hover:text-accent transition-colors" onClick={() => setCurrentPage('reviews')}>Отзывы</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p>+7 (495) 123-45-67</p>
              <p>info@techstore.ru</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>© 2024 TechStore. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'catalog' && <CatalogPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'contacts' && <ContactsPage />}
        {currentPage === 'delivery' && <DeliveryPage />}
        {currentPage === 'reviews' && <ReviewsPage />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;