import json
from django.utils.deprecation import MiddlewareMixin


class CamelCaseMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if response['Content-Type'] == 'application/json':
            data = json.loads(response.content.decode('utf-8'))
            response.content = json.dumps(self.keys_to_camel_case(data))
        return response

    def keys_to_camel_case(self, data):
        def camelize(key):
            parts = iter(key.split("_"))
            return next(parts) + "".join(i.title() for i in parts)

        if isinstance(data, list):
            return [self.keys_to_camel_case(item) for item in data]
        elif isinstance(data, dict):
            return {camelize(key): self.keys_to_camel_case(value) if isinstance(value, (dict, list)) else value for key, value in data.items()}
        else:
            return data
