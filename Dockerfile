# Use an official Ubuntu image as a parent image
FROM ubuntu:20.04

# Update and install necessary dependencies
RUN apt-get update -y && \
    apt-get install -y python3 python3-pip

# Set the working directory to /app
WORKDIR /server

# Copy the current directory contents into the container at /app
COPY . /server

# Install any needed packages specified in requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=wsgi.py

# Run app.py when the container launches
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
