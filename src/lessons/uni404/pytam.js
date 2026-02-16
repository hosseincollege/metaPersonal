export default [

  {
    section: "سؤال 1: مجموع اعداد زوج",
    topics: [
      {
        title: "صورت سؤال",
        content: "برنامه‌ای بنویسید که یک لیست از اعداد صحیح می‌گیرد و مجموع تمام اعداد زوج را برمی‌گرداند.",
        title: "منطق حل",
        subtopics: [
          { title: "List", content: "لیست برای نگهداری چند عدد" },
          { title: "for", content: "for برای پیمایش عناصر لیست" },
          { title: "if", content: "if برای تشخیص زوج بودن" },
          { title: "%", content: "باقی‌مانده صفر → عدد زوج" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
nums = [1,2,3,4,5,6]
sum_even = 0
for n in nums:
    if n % 2 == 0:
        sum_even += n
print(sum_even)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 2: مضرب‌های n",
    topics: [
      {
        title: "صورت سؤال",
        content: "لیستی از اعداد و یک عدد n بگیرد و فقط عناصر مضرب n را در لیست جدید برگرداند.",

        title: "منطق حل",
        subtopics: [
          { title: "List", content: "لیست ورودی و خروجی" },
          { title: "for", content: "بررسی تک‌تک عناصر" },
          { title: "if", content: "بررسی مضرب بودن" },
          { title: "append", content: "اضافه کردن به لیست جدید" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
nums = [1,2,3,4,5,6,10]
n = 2
result = []
for x in nums:
    if x % n == 0:
        result.append(x)
print(result)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 3: بررسی صعودی بودن",
    topics: [
      {
        title: "صورت سؤال",
        content: "بررسی کند آیا عناصر لیست به‌صورت صعودی هستند یا خیر.",

        title: "منطق حل",
        subtopics: [
          { title: "range", content: "دسترسی به اندیس‌ها" },
          { title: "for", content: "مقایسه عنصر با بعدی" },
          { title: "if", content: "اگر ترتیب نقض شود False" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
nums = [1,2,3,4]
is_sorted = True
for i in range(len(nums)-1):
    if nums[i] > nums[i+1]:
        is_sorted = False
print(is_sorted)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 4: رشته‌های طول بیشتر از ۵",
    topics: [
      {
        title: "صورت سؤال",
        content: "رشته‌هایی که طول آن‌ها بیشتر از ۵ است را چاپ کند.",

        title: "منطق حل",
        subtopics: [
          { title: "List", content: "لیست رشته‌ها" },
          { title: "for", content: "پیمایش رشته‌ها" },
          { title: "len", content: "محاسبه طول رشته" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
words = ["apple","hi","banana","cat"]
for w in words:
    if len(w) > 5:
        print(w)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 5: رد کردن مضرب ۵",
    topics: [
      {
        title: "صورت سؤال",
        content: "اعداد 1 تا 15 را چاپ کند ولی مضرب‌های 5 را نادیده بگیرد.",

        title: "منطق حل",
        subtopics: [
          { title: "range", content: "تولید اعداد 1 تا 15" },
          { title: "if", content: "تشخیص مضرب 5" },
          { title: "continue", content: "رد کردن تکرار" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
for i in range(1,16):
    if i % 5 == 0:
        continue
    print(i)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 6: توقف روی حرف a",
    topics: [
      {
        title: "صورت سؤال",
        content: "اگر در رشته به حرف a رسید، حلقه را متوقف کند.",

        title: "منطق حل",
        subtopics: [
          { title: "input", content: "گرفتن رشته از کاربر" },
          { title: "for", content: "بررسی کاراکترها" },
          { title: "if", content: "برخورد با a" },
          { title: "break", content: "توقف حلقه" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
s = input()
for ch in s:
    if ch == 'a':
        print('found a')
        break
    print(ch)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 7: شمارش حروف",
    topics: [
      {
        title: "صورت سؤال",
        content: "تعداد هر حرف غیر فاصله را در رشته بشمارد.",

        title: "منطق حل",
        subtopics: [
          { title: "dict", content: "کلید=حرف مقدار=تعداد" },
          { title: "for", content: "پیمایش رشته" },
          { title: "if", content: "نادیده گرفتن فاصله" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
s = "hi hello"
count = {}
for ch in s:
    if ch != ' ':
        count[ch] = count.get(ch,0) + 1
print(count)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 8: وجود حرف صدادار",
    topics: [
      {
        title: "صورت سؤال",
        content: "اگر رشته حداقل یک حرف صدادار داشته باشد True برگرداند.",

        title: "منطق حل",
        subtopics: [
          { title: "for", content: "بررسی حروف" },
          { title: "in", content: "بررسی عضویت در aeiou" },
          { title: "return", content: "برگشت نتیجه" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
def has_vowel(s):
    for ch in s:
        if ch in "aeiou":
            return True
    return False`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 9: بلندترین کلمه",
    topics: [
      {
        title: "صورت سؤال",
        content: "بلندترین کلمه در لیست را چاپ کند.",

        title: "منطق حل",
        subtopics: [
          { title: "List", content: "لیست رشته‌ها" },
          { title: "for", content: "پیمایش کلمات" },
          { title: "len", content: "مقایسه طول" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
words = ["hi","banana","apple"]
longest = words[0]
for w in words:
    if len(w) > len(longest):
        longest = w
print(longest)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 10: محاسبه معدل دیکشنری",
    topics: [
      {
        title: "صورت سؤال",
        content: "دیکشنری نمرات را گرفته و معدل را حساب کند.",

        title: "منطق حل",
        subtopics: [
          { title: "dict", content: "نمرات" },
          { title: "values()", content: "دریافت نمرات" },
          { title: "len", content: "تعداد دروس" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
scores = {"math":18,"phy":16,"cs":20}
avg = sum(scores.values()) / len(scores)
print(avg)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 11: میانگین با *args",
    topics: [
      {
        title: "صورت سؤال",
        content: "تابع calculate_average که هر تعداد عدد بگیرد و میانگین را حساب کند.",

        title: "منطق حل",
        subtopics: [
          { title: "*args", content: "دریافت چند عدد" },
          { title: "sum", content: "جمع اعداد" },
          { title: "len", content: "تعداد اعداد" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
def calculate_average(*args):
    return sum(args) / len(args)
print(calculate_average(10,20,30))`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 12: مساحت و محیط دایره",
    topics: [
      {
        title: "صورت سؤال",
        content: "تابعی که مساحت و محیط دایره را با گرفتن شعاع از input حساب کند.",

        title: "منطق حل",
        subtopics: [
          { title: "input", content: "گرفتن شعاع" },
          { title: "math.pi", content: "عدد پی" },
          { title: "function", content: "محاسبه" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
import math
r = float(input())
area = math.pi * r * r
perimeter = 2 * math.pi * r
print(area, perimeter)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 13: تعداد عناصر لیست",
    topics: [
      {
        title: "صورت سؤال",
        content: "تابعی که تعداد عناصر لیست را چاپ کند.",

        title: "منطق حل",
        subtopics: [
          { title: "List", content: "لیست ورودی" },
          { title: "len", content: "شمارش عناصر" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
nums = [1,2,3,4]
print(len(nums))`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 14: ادغام یک‌درمیان دو لیست",
    topics: [
      {
        title: "صورت سؤال",
        content: "عناصر دو لیست را به صورت یکی در میان ادغام کند.",

        title: "منطق حل",
        subtopics: [
          { title: "for", content: "پیمایش با اندیس" },
          { title: "append", content: "اضافه به لیست جدید" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
a = [1,2,3]
b = ['a','b','c']
result = []
for i in range(len(a)):
    result.append(a[i])
    result.append(b[i])
print(result)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 15: کلاس BankAccount",
    topics: [
      {
        title: "صورت سؤال",
        content: "کلاس BankAccount با balance و متدهای deposit، withdraw و نمایش موجودی.",

        title: "منطق حل",
        subtopics: [
          { title: "class", content: "تعریف کلاس" },
          { title: "__init__", content: "موجودی اولیه" },
          { title: "method", content: "deposit / withdraw" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
class BankAccount:
    def __init__(self,balance):
        self.balance = balance
    def deposit(self,amount):
        self.balance += amount
    def withdraw(self,amount):
        self.balance -= amount
    def show(self):
        print(self.balance)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 16: کلاس Rectangle",
    topics: [
      {
        title: "صورت سؤال",
        content: "کلاس Rectangle با متد area و perimeter.",

        title: "منطق حل",
        subtopics: [
          { title: "class", content: "تعریف کلاس" },
          { title: "method", content: "area و perimeter" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
class Rectangle:
    def __init__(self,w,h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h
    def perimeter(self):
        return 2*(self.w+self.h)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 17: کلاس StudentRecord",
    topics: [
      {
        title: "صورت سؤال",
        content: "نگهداری نام، شماره دانشجویی و نمرات و محاسبه معدل.",

        title: "منطق حل",
        subtopics: [
          { title: "class", content: "اطلاعات دانشجو" },
          { title: "list", content: "نمرات" },
          { title: "average", content: "محاسبه معدل" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
class StudentRecord:
    def __init__(self,name,id,grades):
        self.name = name
        self.id = id
        self.grades = grades
    def average(self):
        return sum(self.grades)/len(self.grades)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 18: کلاس Point2D",
    topics: [
      {
        title: "صورت سؤال",
        content: "محاسبه فاصله نقطه دوبعدی از مبدأ.",

        title: "منطق حل",
        subtopics: [
          { title: "math.sqrt", content: "محاسبه فاصله" },
          { title: "x,y", content: "مختصات" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
import math
class Point2D:
    def __init__(self,x,y):
        self.x = x
        self.y = y
    def distance_from_origin(self):
        print(math.sqrt(self.x**2 + self.y**2))`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 19: شمارش مثبت منفی صفر",
    topics: [
      {
        title: "صورت سؤال",
        content: "تعداد اعداد مثبت، منفی و صفر را بشمارد.",

        title: "منطق حل",
        subtopics: [
          { title: "for", content: "پیمایش اعداد" },
          { title: "if/elif", content: "تشخیص نوع عدد" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
nums = [-1,0,2,3]
pos = neg = zero = 0
for n in nums:
    if n > 0: pos += 1
    elif n < 0: neg += 1
    else: zero += 1
print(pos,neg,zero)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 20: اولین عدد زوج",
    topics: [
      {
        title: "صورت سؤال",
        content: "اولین عدد زوج را پیدا کرده و حلقه را متوقف کند.",

        title: "منطق حل",
        subtopics: [
          { title: "for", content: "پیمایش لیست" },
          { title: "break", content: "توقف بعد از یافتن" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
nums = [1,3,5,8,9]
found = False
for n in nums:
    if n % 2 == 0:
        print(n)
        found = True
        break
if not found:
    print("عدد زوجی وجود ندارد")`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 21: مجموع مربعات",
    topics: [
      {
        title: "صورت سؤال",
        content: "مجموع مربعات عناصر لیست را چاپ کند.",

        title: "منطق حل",
        subtopics: [
          { title: "for", content: "پیمایش" },
          { title: "**", content: "توان دوم" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
nums = [1,2,3]
total = 0
for n in nums:
    total += n*n
print(total)`
          }
        ]
      }
    ]
  },

  {
    section: "سؤال 22: طول رشته‌ها",
    topics: [
      {
        title: "صورت سؤال",
        content: "طول هر رشته را در یک لیست جدید برگرداند.",

        title: "منطق حل",
        subtopics: [
          { title: "List", content: "لیست جدید" },
          { title: "len", content: "طول رشته" }
        ]
      },
      {
        title: "کد",
        subtopics: [
          {
            title: "code",
            content: `
words = ["hi","apple","banana"]
lengths = []
for w in words:
    lengths.append(len(w))
print(lengths)`
          }
        ]
      }
    ]
  }

];
