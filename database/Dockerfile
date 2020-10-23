FROM mysql
RUN sed -i '/skip-name-resolve/d' /etc/mysql/conf.d/docker.cnf
ENV MYSQL_DATABASE no_pain_no_gain
COPY . /docker-entrypoint-initdb.d/