# cloudformation stack params
# ex: make HOSTED_ZONE_ID="XYZ" ACM_ARN="XYZ" DOMAIN_NAME="XYZ.XYZ" PRICE_CLASS="XYZ" createStack
HOSTED_ZONE_ID := $(HOSTED_ZONE_ID)
ACM_ARN := $(ACM_ARN)
DOMAIN_NAME := $(DOMAIN_NAME)
PRICE_CLASS := $(PRICE_CLASS)
PROJECT_NAME := $(PROJECT_NAME)

# upload static website params
# ex: make BUCKET_NAME="XYZ" CF_DISTRIBUTION_ID="XYZ" uploadClient
BUCKET_NAME= $(BUCKET_NAME) # <- in our template should be the domain-name
CF_DISTRIBUTION_ID := $(CF_DISTRIBUTION_ID)

.PHONY: uploadClient
uploadClient: build
	yarn relay
	yarn build
	aws s3 sync --delete build/ s3://$(DOMAIN_NAME)
	aws cloudfront create-invalidation --distribution-id $(CF_DISTRIBUTION_ID) --paths '/*'

.PHONY: createStack
createStack:
	aws cloudformation create-stack \
		--stack-name $(PROJECT_NAME)-frontend \
		--template-body file://aws/$(PROJECT_NAME)-frontend.yaml \
		--capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
		--parameters \
			ParameterKey=MyHostedZoneID,ParameterValue=$(HOSTED_ZONE_ID) \
			ParameterKey=AcmCertificateArn,ParameterValue=$(ACM_ARN) \
			ParameterKey=DomainName,ParameterValue=$(DOMAIN_NAME) \
			ParameterKey=PriceClass,ParameterValue=$(PRICE_CLASS)

.PHONY: updateStack
updateStack:
	aws cloudformation update-stack \
		--stack-name $(PROJECT_NAME)-frontend \
		--template-body file://aws/$(PROJECT_NAME)-frontend.yaml \
		--capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
		--parameters \
			ParameterKey=MyHostedZoneID,ParameterValue=$(HOSTED_ZONE_ID) \
			ParameterKey=AcmCertificateArn,ParameterValue=$(ACM_ARN) \
			ParameterKey=DomainName,ParameterValue=$(DOMAIN_NAME) \
			ParameterKey=PriceClass,ParameterValue=$(PRICE_CLASS)

.PHONY: deleteStack
deleteStack:
	aws cloudformation delete-stack --stack-name $(PROJECT_NAME)-frontend