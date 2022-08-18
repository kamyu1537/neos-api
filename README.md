# neos-api

my neosvr in-game api server

## API

- **GET /neosrec/<user_id>/<public_folder_id>**  
  - Get public folder path
```
<public_folder_path>
```
---
- **GET /objects/<user_id>/<public_folder_path>**
  - Get objects in the public folder
```
<object_id>|<object_name>|<thumbnail_uri>|<asset_uri>
<object_id>|<object_name>|<thumbnail_uri>|<asset_uri>
<object_id>|<object_name>|<thumbnail_uri>|<asset_uri>
...
```
