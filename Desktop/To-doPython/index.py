# Define an empty list to store Tasks
tasks = []

# function to display the to-do list
def show_tasks():
    if not tasks: 
        print("Your to-do list is empty")
    else: 
        print("To-Do List: ")
        for i, task in enumerate(tasks, 1):
            print(f"{i}. {task}")

# function to add tasks in list
def add_tasks(task):
    tasks.append(task)
    print(f"Task {task} added to the to-do list.")

# function to remove the task from the list
def remove_tasks(task_index):
    if 1<= task_index <= len(tasks):
        removed_task = tasks.pop(task_index - 1)
        print(f"Task {removed_task} removed from the to-do list")
    else:
        print("Invalid task Index. Please enter a valid task number")


# Main Program Loop 
while True:
    print("\nOptions:")
    print("1. Show To-Do List")
    print("2. Add a Task ")
    print("3. Remove a Task")
    print("4. Quit")

    choice = input("Enter your Choice: ")

    if choice == "1":
        show_tasks()
    elif choice == "2":
        new_task = input("Enter the Task you want to add: ")
        add_tasks(new_task)
    elif choice == "3":
        show_tasks()
        task_index = int(input(" Enter the Task Number you want to remove: "))
        remove_tasks(task_index)
    elif choice == "4":
        print("GoodByee")
        break

    else:
        print("Invalid Choice!, Please choose a valid option.")