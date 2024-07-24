package main

import (
	"context"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

type Handler struct{}

func NewHandler() (*Handler, error) {
	return &Handler{}, nil
}

func (h *Handler) Handle(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       "Ruleset Lambda OK",
	}, nil

}
