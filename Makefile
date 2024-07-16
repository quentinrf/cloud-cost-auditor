.PHONY: build configure test clean

LAMBDA_FUNCTIONS = ruleset

build:
	make clean
	mkdir -p ./bin
	
	for func in ${LAMBDA_FUNCTIONS} ; do \
		GOOS=linux GOARCH=amd64 go build -tags lambda.norpc -buildmode pie \
		-o bin/bootstrap functions/$$func/*.go ; \
		cd bin && zip $$func.zip bootstrap && cd .. ; \
	done

configure:
	go install github.com/jstemmer/go-junit-report/v2@v2.0.0 && go mod download

test:
	rm -rf test-results/
	mkdir -p ./test-results/

	# test go code
	go test ./... -v --cover -coverprofile ./test-results/coverprofile.txt ./ 2>&1 | tee ./test-results/output.txt
	go-junit-report -set-exit-code < ./test-results/output.txt > ./test-results/report.xml

clean:
	rm -rf ./bin