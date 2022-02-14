FROM public.ecr.aws/lambda/nodejs:14

ADD dist ${LAMBDA_TASK_ROOT}/
COPY package.json yarn.lock ${LAMBDA_TASK_ROOT}/

RUN npm i -g yarn
RUN yarn

CMD [ "app.handler" ]  