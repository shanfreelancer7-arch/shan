import re
from datetime import datetime
from django.core.mail import send_mail
from django.conf import settings

def validate_phone_number(phone):
    """
    Validate Indian phone number format.
    Returns True if valid, False otherwise.
    """
    pattern = re.compile(r'^[6-9]\d{9}$')
    return bool(pattern.match(phone))

def format_currency(amount):
    """
    Format amount in Indian Rupee format.
    Example: 125000 -> ₹1,25,000
    """
    try:
        amount = float(amount)
        # Indian currency formatting
        s = str(int(amount))
        l = len(s)
        if l > 3:
            last_three = s[-3:]
            rest = s[:-3]
            if len(rest) == 1:
                formatted = rest + ',' + last_three
            else:
                formatted = re.sub(r'(\d{2})(?=\d)', r'\1,', rest) + ',' + last_three
        else:
            formatted = s
        return f'₹{formatted}'
    except:
        return f'₹{amount}'

def generate_order_id():
    """
    Generate a unique order ID.
    Format: ORD-YYYYMMDD-XXXX
    """
    from .models import Order
    import random
    import string
    
    today = datetime.now().strftime('%Y%m%d')
    random_str = ''.join(random.choices(string.digits, k=4))
    order_id = f"ORD-{today}-{random_str}"
    
    # Ensure uniqueness (though probability of collision is low)
    while Order.objects.filter(id=order_id).exists():
        random_str = ''.join(random.choices(string.digits, k=4))
        order_id = f"ORD-{today}-{random_str}"
    
    return order_id

def generate_quote_id():
    """
    Generate a unique quote ID.
    Format: QT-YYYYMMDD-XXXX
    """
    from .models import QuoteRequest
    import random
    import string
    
    today = datetime.now().strftime('%Y%m%d')
    random_str = ''.join(random.choices(string.digits, k=4))
    quote_id = f"QT-{today}-{random_str}"
    
    while QuoteRequest.objects.filter(id=quote_id).exists():
        random_str = ''.join(random.choices(string.digits, k=4))
        quote_id = f"QT-{today}-{random_str}"
    
    return quote_id

def send_order_confirmation_email(user_email, order_id, product_name, quantity, total_price):
    """
    Send order confirmation email to customer.
    (Configure email backend in settings.py)
    """
    subject = f'Order Confirmation - Shan Associates (Order #{order_id})'
    message = f"""
    Dear Customer,

    Thank you for your order with Shan Associates.

    Order Details:
    Order ID: {order_id}
    Product: {product_name}
    Quantity: {quantity}
    Total Amount: {format_currency(total_price)}

    We will process your order soon. For any queries, contact us at shanassociates2020@gmail.com or WhatsApp.

    Regards,
    Shan Associates Team
    """
    try:
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user_email])
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False

def send_quote_acknowledgement_email(user_email, quote_id, product_name, quantity):
    """
    Send quote request acknowledgement email.
    """
    subject = f'Quote Request Received - Shan Associates (Quote #{quote_id})'
    message = f"""
    Dear Customer,

    We have received your quote request.

    Quote Details:
    Quote ID: {quote_id}
    Product: {product_name}
    Quantity: {quantity}

    Our team will get back to you within 24 hours.

    Regards,
    Shan Associates Team
    """
    try:
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user_email])
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False