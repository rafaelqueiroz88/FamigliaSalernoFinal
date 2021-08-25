require "shrine"
require "shrine/storage/file_system"
require "shrine/storage/url"

Shrine.storages[:cache] = Shrine::Storage::Url.new
Shrine.storages[:store] = Shrine::Storage::Url.new

Shrine.storages = { 
  cache: Shrine::Storage::FileSystem.new("public", prefix: "uploads/cache"), # temporary 
  store: Shrine::Storage::FileSystem.new("public", prefix: "uploads"),       # permanent 
}
 
Shrine.plugin :activerecord 
Shrine.plugin :cached_attachment_data
Shrine.plugin :restore_cached_data
Shrine.plugin :validation
Shrine.plugin :validation_helpers
Shrine.plugin :remote_url, max_size: 20*1024*1024
Shrine.plugin :derivatives