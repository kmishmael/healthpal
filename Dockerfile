# Use an official Ubuntu image as a parent image
FROM ubuntu:20.04

# Update and install necessary dependencies
RUN apt-get update -y && \
    apt-get install -y python3 python3-pip

# Set the working directory to /app
WORKDIR /app

# Copy the content of the 'server' folder into the container at /app
COPY server /app

# Change to the 'server' directory
WORKDIR /app/server

# Install any needed packages specified in requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
