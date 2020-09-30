class PagesController < ApplicationController
    def show
    render template: "pages/#{params[:page]}"
    end
  end 