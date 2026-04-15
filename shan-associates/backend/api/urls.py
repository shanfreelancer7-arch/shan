from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, ProductListView, OrderCreateView, QuoteCreateView, UserOrderListView, UserQuoteListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', ProductListView.as_view(), name='products'),
    path('orders/', OrderCreateView.as_view(), name='create_order'),
    path('my-orders/', UserOrderListView.as_view(), name='my_orders'),
    path('quotes/', QuoteCreateView.as_view(), name='create_quote'),
    path('my-quotes/', UserQuoteListView.as_view(), name='my_quotes'),
]