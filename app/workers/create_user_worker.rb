class CreateUserWorker
    include Sidekiq::Worker

    sidekiq_options retry: false, queue_as :default

    def perform(args)
        users = User.all
    end
end