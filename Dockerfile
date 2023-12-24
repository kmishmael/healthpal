# Use an official Ubuntu image as a parent image
FROM ubuntu:20.04

# Update and install necessary dependencies
RUN apt-get update -y && \
    apt-get install -y python3 python3-pip

# Set the working directory to /app
WORKDIR /app

# Copy the content of the 'server' folder into the container at /app/server
COPY server /app/server

# Change to the 'server' directory
WORKDIR /app/server

# If a requirements.txt file exists, install dependencies
# If not, you may need to handle dependencies in a different way
RUN if [ -f requirements.txt ]; then pip3 install --no-cache-dir -r requirements.txt; fi

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=wsgi.py

# Run app.py when the container launches
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
