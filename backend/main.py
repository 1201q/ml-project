import numpy
import tensorflow

import requests
from io import BytesIO
from werkzeug.exceptions import BadRequest

from tensorflow.keras.layers import Dense, Flatten, Conv2D
from tensorflow.keras import Model
from PIL import Image
from flask import jsonify

URL = 'url'
CLASS = 'class'
CODE = 'code'
MESSAGE = 'message'
DATA = 'data'

# We keep model as global variable so we don't have to reload it in case of warm invocations
model = None


class CustomModel(Model):
    def __init__(self):
        super(CustomModel, self).__init__()
        self.conv1 = Conv2D(32, 3, activation='relu')
        self.flatten = Flatten()
        self.d1 = Dense(128, activation='relu')
        self.d2 = Dense(10, activation='softmax')

    def call(self, x):
        x = self.conv1(x)
        x = self.flatten(x)
        x = self.d1(x)
        return self.d2(x)


def predict_mnist(request):

    parameters = [
        URL,
    ]

    if request.get_json():
        json_request = request.get_json()
        for parameter in parameters:
            if not json_request.get(parameter) is None:
                continue
            raise BadRequest('invalid request parameter: %s' % parameter)

        url = json_request.get(URL)

    else:
        raise BadRequest('invalid arguments error')

    predicted_class = predict_mnist_internal(url)

    data = {
        CLASS: predicted_class,
    }

    res = {
        CODE: 200,
        MESSAGE: 'OK',
        DATA: data,
    }
    return jsonify(res)


def predict_mnist_internal(url):

    global model
    class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
                   'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

    # Model load which only happens during cold starts
    if model is None:
        model = CustomModel()
        model.load_weights('fashion_mnist_weights')

    response = requests.get(url)

    input_np = (numpy.array(Image.open(BytesIO(response.content)))/255)[numpy.newaxis,:,:,numpy.newaxis]
    predictions = model.call(input_np)
    print(predictions)
    predicted_class = class_names[numpy.argmax(predictions)]
    print("Image is " + predicted_class)
    return predicted_class


# predict_mnist_internal('https://raw.githubusercontent.com/ryfeus/gcf-packs/master/tensorflow2.0/example/test.png')
