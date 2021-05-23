from django.conf.urls import url, re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'^ws/play/(?P<room_code>\w+)/$',
            consumers.TicTacToeConsumer),
    # re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer),
]
