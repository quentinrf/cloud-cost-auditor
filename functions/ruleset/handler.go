package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

type Handler struct{}

func NewHandler() (*Handler, error) {
	return &Handler{}, nil
}

func (h *Handler) Handle(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	respBody := map[string]string{
		"message": "RuleSet Lambda OKAY",
	}

	respBodyJson, err := json.MarshalIndent(respBody, "", "\t")
	if err != nil {
		panic(err)
	}
	
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       string(respBodyJson),
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		IsBase64Encoded: false,
	}, nil

}
