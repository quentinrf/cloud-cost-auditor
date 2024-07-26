package main

import(
	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	h, err := NewHandler()
	if err != nil {
		panic(err)
	}
	lambda.Start(h.Handle)
}
